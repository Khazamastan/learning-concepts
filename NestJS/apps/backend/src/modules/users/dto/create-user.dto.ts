import { Role } from '@prisma/client';

export class CreateUserDto {
  email!: string;
  passwordHash!: string;
  firstName!: string;
  lastName!: string;
  role?: Role;
}
