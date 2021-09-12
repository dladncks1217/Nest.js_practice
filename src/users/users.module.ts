import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';

@Module({
  imports: [TypeOrmModule.forFeature([Users])], // 이렇게 repository가 userService에 인젝션이 됨.
  providers: [UsersService,],
  controllers: [UsersController]
})
export class UsersModule {}
