import { CreateUserDTO } from '../Dto';

export const userMock: CreateUserDTO = new CreateUserDTO(
  123457,
  '00000000004',
  'Wllan',
  1001,
);

export const mockUserUpdated = {
  ...userMock,
  balance: userMock.balance + 123,
};
