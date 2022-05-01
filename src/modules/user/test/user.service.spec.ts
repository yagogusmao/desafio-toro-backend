import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from '../infra/database';
import { UserService } from '../service';
import { mockUserUpdated, userMock } from './user.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { IUserRepository } from '../interfaces';

describe('UserService', () => {
  let service: UserService;
  let repository: IUserRepository;

  const mockRepository = {
    getUser: jest.fn().mockReturnValue(undefined),
    getUserByCpf: jest.fn().mockReturnValue(undefined),
    createUser: jest.fn().mockReturnValue(userMock),
    updateBalance: jest.fn().mockReturnValue(mockUserUpdated(123)),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<IUserRepository>(UserRepository);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  describe('when create user', () => {
    it('should be create user', async () => {
      const userCreated = await service.createUser(userMock);
      expect(mockRepository.createUser).toBeCalledWith(
        userMock.account,
        userMock.name,
        userMock.cpf,
        userMock.balance,
      );
      expect(userCreated).toBe(userMock);
    });
    it('user account already exists', async () => {
      mockRepository.getUser.mockReturnValue(userMock);

      const user = service.createUser(userMock);
      expect(user).rejects.toThrow(new BadRequestException('User exist'));
    });
    it('user cpf already exists', async () => {
      mockRepository.getUserByCpf.mockReturnValue(userMock);

      service
        .createUser(userMock)
        .catch((error) =>
          expect(error).toEqual(new BadRequestException('User exist')),
        );
    });
  });
  describe('when get user by account', () => {
    it('user exist in database', async () => {
      const user = await service.getUser(userMock.account);
      expect(user).toEqual(userMock);
    });
    it('user not exist in database', () => {
      mockRepository.getUser.mockReturnValue(undefined);
      const user = service.getUser(userMock.account);

      expect(user).rejects.toThrow(new BadRequestException('User not found'));
    });
  });
  describe('when get user by cpf', () => {
    it('user exist in database', async () => {
      const user = await service.getUserByCpf(userMock.cpf);
      expect(user).toEqual(userMock);
    });
    it('user not exist in database', () => {
      mockRepository.getUserByCpf.mockReturnValue(undefined);
      const user = service.getUserByCpf(userMock.cpf);

      expect(user).rejects.toThrow(new BadRequestException('User not found'));
    });
  });
  describe('when updating balance of user', () => {
    it('update balance is succesfull', async () => {
      const amount = 123;

      const userUpdated = await service.updateBalance(userMock.account, amount);
      expect(userUpdated).toStrictEqual(mockUserUpdated(amount));
    });
  });
});
