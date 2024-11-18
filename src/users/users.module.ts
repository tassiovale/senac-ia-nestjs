import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { EncryptionService } from './encryption/encryption.service';
import { SharedModule } from 'src/shared/shared.module';

@Module({
  imports:[
    JwtModule.register({
      global: true,
      secret: 'dklfjgh7fghbfgjh07gjkhl54t',
      signOptions: { expiresIn: '30m' },
    }),
    TypeOrmModule.forFeature([User]),
    SharedModule
  ],
  controllers: [UsersController],
  providers: [UsersService, EncryptionService],
})
export class UsersModule {}
