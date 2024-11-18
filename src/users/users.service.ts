import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { EncryptionService } from './encryption/encryption.service';
import { SearchUserDto } from './dto/search-user.dto';
import { PaginationService } from 'src/shared/pagination.service';

@Injectable()
export class UsersService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private encryptionService: EncryptionService,
    private paginationService: PaginationService
  ) { }

  async authenticate(loginDto: LoginDto) {
    const userFound = await this.usersRepository.findOneBy({ email: loginDto.email });
    if (!userFound) {
      throw new UnauthorizedException();
    }
    const passwordMatches = await this.encryptionService.hashIsEqualToText(
      userFound.password,
      loginDto.password
    );
    if (!passwordMatches) {
      throw new UnauthorizedException();
    }
    const payload = {
      id: userFound.id,
      email: userFound.email,
      name: userFound.name
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async create(createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const encryptedPassword = await this.encryptionService.encrypt(password);
    const user = this.usersRepository.save({ name, email, password: encryptedPassword });
    return user;
  }

  async search(searchUserDto: SearchUserDto) {
    console.log(searchUserDto)
    return this.paginationService.paginate<User>(
      this.usersRepository,
      searchUserDto,
      (qb) => {
        qb.select(['User.name', 'User.email']) // Seleciona apenas as colunas 'name' e 'email'
          .where('User.name LIKE :name', { name: `%${searchUserDto.name}%` }) // Filtro de nome
          .orderBy('User.name', 'ASC'); // Ordenação por nome
      },
    );
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
