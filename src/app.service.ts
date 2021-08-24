import { Injectable } from '@nestjs/common';

@Injectable() // 이거 있으면 module에 provider로 넣어줘야함.
export class AppService {
  getHello(): string {
    return process.env.SECRET;
  }
}
