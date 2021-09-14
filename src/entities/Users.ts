import { ApiProperty } from '@nestjs/swagger';
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinTable,
    ManyToMany,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { ChannelChats } from './ChannelChats';
  import { ChannelMembers } from './ChannelMembers';
  import { Channels } from './Channels';
  import { DMs } from './DMs';
  import { Mentions } from './Mentions';
  import { WorkspaceMembers } from './WorkspaceMembers';
  import { Workspaces } from './Workspaces';
  import { IsEmail, IsString, IsNotEmpty } from 'class-validator';    
  // validation 사용 위해서는 validationPipe 지정해야함.(Main.ts 지정해주자.)

  @Index('email', ['email'], { unique: true })
  @Entity({ schema: 'sleact', name: 'users' })
  export class Users {
    @ApiProperty({
      example:1,
      description:'사용자 아이디',
    })
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;
  
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({
      example:'dlaxodud1217@gmail.com',
      description:'이메일',
    })
    @Column('varchar', { name: 'email', unique: true, length: 30 })
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
      example:'새로운 닉네임',
      description:'닉네임',
    })
    @Column('varchar', { name: 'nickname', length: 30 })
    nickname: string;
  

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
      example:'qwerty1234asdf!@#',
      description:'비밀번호',
    })
    @Column('varchar', { name: 'password', length: 100, select: false })
    password: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
  
    @OneToMany(() => ChannelChats, (channelchats) => channelchats.User)
    ChannelChats: ChannelChats[];
  
    @OneToMany(() => ChannelMembers, (channelmembers) => channelmembers.User)
    ChannelMembers: ChannelMembers[];
  
    @OneToMany(() => DMs, (dms) => dms.Sender) // 1대다관계 연속 2번
    DMs: DMs[];
  
    @OneToMany(() => DMs, (dms) => dms.Receiver)
    DMs2: DMs[];
  
    @OneToMany(() => Mentions, (mentions) => mentions.Sender)
    Mentions: Mentions[];
  
    @OneToMany(() => Mentions, (mentions) => mentions.Receiver)
    Mentions2: Mentions[];
  
    @OneToMany(
      () => WorkspaceMembers,
      (workspacemembers) => workspacemembers.User,
    )
    WorkspaceMembers: WorkspaceMembers[];
  
    @OneToMany(() => Workspaces, (workspaces) => workspaces.Owner)
    OwnedWorkspaces: Workspaces[];
  
    @ManyToMany(() => Workspaces, (workspaces) => workspaces.Members) // ManyToMany는 OneToMany와 다르게 컬럼이 아닌(Join컬럼) 테이블을(Join테이블) 넣어줌. 조인테이블의 경우 아무데나 넣어도 상관없음
    @JoinTable({
      name: 'workspacemembers',
      joinColumn: {
        name: 'UserId',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'WorkspaceId',
        referencedColumnName: 'id',
      },
    })
    Workspaces: Workspaces[];
  
    @ManyToMany(() => Channels, (channels) => channels.Members)
    @JoinTable({
      name: 'channelmembers',
      joinColumn: {
        name: 'UserId',
        referencedColumnName: 'id',
      },
      inverseJoinColumn: {
        name: 'ChannelId',
        referencedColumnName: 'id',
      },
    })
    Channels: Channels[];
  }