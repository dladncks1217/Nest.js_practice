import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller('aaa')
export class AppController { // aaa
    constructor(private readonly appService: AppService) {}

    @Get('user') // GET/aaa/user
    getUser(): string { 
      return this.appService.getUser();
    }
    
    @Post('hello') // POST/aaa/user 
    postUser(): string {
      return this.appService.postUser();
    }
}
