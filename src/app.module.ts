import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import {ConfigModule} from '@nestjs/config';
import { AppService } from './app.service';
import { LoggerMiddleware } from 'middlewares/logger.middlewares';
import { UsersModule } from './users/users.module';
import { WorkspaceModule } from './workspace/workspace.module';
import { ChannelsModule } from './channels/channels.module';
import { DmsModule } from './dms/dms.module';
import { WorkspacesService } from './workspaces/workspaces.service';
import { WorkspacesController } from './workspaces/workspaces.controller';
import { WorkspacesModule } from './workspaces/workspaces.module';

@Module({
  imports: [ConfigModule.forRoot(), UsersModule, WorkspaceModule, ChannelsModule, DmsModule, WorkspacesModule], // forRoot같은거 있는거는 설정할수있는 그런것들
  controllers: [AppController, WorkspacesController],
  providers: [AppService, WorkspacesService], // 이 provider에 연결되어있는 것을 확인한 뒤 의존성 주입을 해준다.
})
export class AppModule implements NestModule{
  configure(consumer: MiddlewareConsumer):any{
    consumer.apply(LoggerMiddleware).forRoutes('*');        
  }
}
