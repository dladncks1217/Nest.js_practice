// ormconfig가 밖에 없으면 migration 시 인식을 못하는 문제 발생.
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import dotenv from 'dotenv';
import { Channels } from './src/entities/Channels';
import { ChannelChats } from './src/entities/ChannelChats';
import { ChannelMembers } from './src/entities/ChannelMembers';
import { DMs } from './src/entities/DMs';
import { Mentions } from './src/entities/Mentions';
import { Users } from './src/entities/Users';
import { WorkspaceMembers } from './src/entities/WorkspaceMembers';
import { Workspaces } from './src/entities/Workspaces';

dotenv.config();
const config: TypeOrmModuleOptions = { // 이 정보들 orm
    type:'mysql',
    host:'localhost',
    port:3306,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABASE,
    entities:[
        ChannelChats,
        ChannelMembers,
        Channels,
        DMs,
        Mentions,
        Users,
        WorkspaceMembers,
        Workspaces
    ], // 여기에 entities 넣어서 하면 만들어짐
    // autoLoadEntities : true,    이거 종종 버그난다고함
    synchronize : false, // synchronize:true 이건 개발환경일때만 하자. (개발환경에서 디비 만들어서 올리는 케이스만 사용.)
    // 한번 만들고나면 false로 해두자! (안하면 실제데이터 날려먹을수있음)
    migrations:[__dirname+'/src/migrations/*ts'],
    cli:{migrationsDir:'src/migrations'},
    autoLoadEntities:true,
    charset:'utf8mb4',
    logging:true, // 개발할때는 로깅 켜두자.
    keepConnectionAlive:true, // 핫 리로딩하면 typeorm은 db연결을 끊어버림 디비연결끊겼다는 에러나오니까 해두자.
  }

  export = config;