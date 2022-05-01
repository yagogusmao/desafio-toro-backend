import { Test, TestingModule } from '@nestjs/testing';
import { TransferRepository } from '../infra/database';
import { TransferService } from '../service';
import { transferMock } from './transfer.mock';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { ITransferRepository } from '../interfaces';
import { I_USER_SERVICE } from '../../../shared/utils/constants';
import {
  mockUserUpdated,
  userMock,
} from '../../../modules/user/test/user.mock';

describe('UserService', () => {
  let service: TransferService;
  let repository: ITransferRepository;

  const mockRepository = {
    createTransfer: jest.fn().mockReturnValue(transferMock),
    getTransfersByUser: jest.fn().mockReturnValue([transferMock]),
  };
  const mockUserService = {
    getUser: jest.fn().mockReturnValue(userMock),
    updateBalance: jest.fn().mockReturnValue(mockUserUpdated(1000)),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TransferService,
        {
          provide: TransferRepository,
          useValue: mockRepository,
        },
        {
          provide: I_USER_SERVICE,
          useValue: mockUserService,
        },
      ],
    }).compile();

    service = module.get<TransferService>(TransferService);
    repository = module.get<ITransferRepository>(TransferRepository);
  });
  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });
  describe('when get transfers of user', () => {
    it('should be return the transfers account if exists', async () => {
      const transfers = await service.getTransfersByUser(
        transferMock.target_account,
      );
      expect(transfers).toStrictEqual([transferMock]);
    });
    it('account not exist', () => {
      mockUserService.getUser.mockReturnValue(undefined);
      const transfers = service.getTransfersByUser('111111');
      expect(transfers).rejects.toThrow(
        new NotFoundException('Account not found'),
      );
    });
  });
  describe('when update balance of user with transfer', () => {
    it('should be updated a balance', async () => {
      mockUserService.getUser.mockReturnValue(userMock);
      const userUpdated = await service.createTransfer(transferMock);
      expect(userUpdated).toStrictEqual(mockUserUpdated(transferMock.amount));
    });
    it('target account not exist', () => {
      mockUserService.getUser.mockReturnValue(undefined);
      const userUpdated = service.createTransfer(transferMock);
      expect(userUpdated).rejects.toThrow(
        new NotFoundException('Target account not found'),
      );
    });
    it('target account does not match with cpf in database not exist', () => {
      mockUserService.getUser.mockReturnValue({
        ...userMock,
        cpf: '11111111111',
      });
      const userUpdated = service.createTransfer(transferMock);
      expect(userUpdated).rejects.toThrow(
        new BadRequestException(
          'User cpf does not match with sent account cpf',
        ),
      );
    });
  });
});
