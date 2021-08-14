import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import {ConfigModule} from '@nestjs/config';
import { AppService } from './app.service';
import { LoggerMiddleware } from 'middlewares/logger.middlewares';

@Module({
  imports: [ConfigModule.forRoot()], // forRoot같은거 있는거는 설정할수있는 그런것들
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer):any{
    consumer.apply(LoggerMiddleware).forRoutes('*');        
  }
}
