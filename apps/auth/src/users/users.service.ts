import {
  ConflictException,
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { GetUserDto } from '../dto/get-user.dto';
import { CreateUserDTO } from './dto/create-user.dto';
import { UsersRepository } from './users.repository';
@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}
  async create(createUserDTO: CreateUserDTO) {
    await this.validateCreateUserDTO(createUserDTO);
    return this.usersRepository.create({
      ...createUserDTO,
      password: await bcrypt.hash(createUserDTO.password, 10),
    });
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({ email });
    const passwordIsValid = await bcrypt.compare(password, user.password);

    if (!passwordIsValid)
      throw new UnauthorizedException('Email or password is invalid');

    return user;
  }

  async getUser(getUserDto: GetUserDto) {
    return this.usersRepository.findOne(getUserDto);
  }
  private async validateCreateUserDTO(createUserDTO: CreateUserDTO) {
    try {
      await this.usersRepository.findOne({ email: createUserDTO.email });
    } catch (error) {
      return;
    }
    throw new ConflictException('User with email already exists');
  }
}
