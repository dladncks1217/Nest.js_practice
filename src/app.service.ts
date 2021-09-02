import { Injectable } from '@nestjs/common';
import { UsersService } from './users/users.service';

@Injectable() // 이거 있으면 module에 provider로 넣어줘야함.
export class AppService {
  constructor(private userService: UsersService){}
  getHello(): string {
    return process.env.SECRET;
  }
}
