import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TimeController } from './time.controller';
import { UsersModule } from './users/users.module';
import { AiModule } from './ai/ai.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './users/auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { SharedModule } from './shared/shared.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'senac123',
      database: 'games',
      entities: [
        User
      ],
      synchronize: true,
    }),
    UsersModule, 
    AiModule, SharedModule
  ],
  controllers: [AppController, TimeController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
