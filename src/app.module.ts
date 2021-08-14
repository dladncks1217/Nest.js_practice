import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import {ConfigModule} from '@nestjs/config';
import { AppService } from './app.service';

@Module({
  imports: [ConfigModule.forRoot()], // forRoot같은거 있는거는 설정할수있는 그런것들
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
