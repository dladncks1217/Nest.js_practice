// 엔티티 == 테이블
import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { Channels } from './Channels';
  import { DMs } from './DMs';
  import { Mentions } from './Mentions';
  import { WorkspaceMembers } from './WorkspaceMembers';
  import { Users } from './Users';
  
  @Index('name', ['name'], { unique: true })
  @Index('url', ['url'], { unique: true })
  @Index('OwnerId', ['OwnerId'], {})
  @Entity({ schema: 'sleact', name: 'workspaces' }) // 테이블명
  export class Workspaces {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' }) // primary key에는 PrimaryGeneratedColumn 사용해주자.
    id: number;
  
    @Column('varchar', { name: 'name', unique: true, length: 30 })
    name: string;
  
    @Column('varchar', { name: 'url', unique: true, length: 30 })
    url: string; 
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @DeleteDateColumn()
    deletedAt: Date | null;
  
    @Column('int', { name: 'OwnerId', nullable: true })
    OwnerId: number | null;
  
    @OneToMany(() => Channels, (channels) => channels.Workspace) // 1대다 (workspace내에서 여러 개의 채널.) 이런 경우 사용 시 반대에도 똑같이 해줘야함. (Channels.ts에 @ManyToOne)
    Channels: Channels[];
  
    @OneToMany(() => DMs, (dms) => dms.Workspace)
    DMs: DMs[];
  
    @OneToMany(() => Mentions, (mentions) => mentions.Workspace)
    Mentions: Mentions[];
  
    @OneToMany(
      () => WorkspaceMembers,
      (workspacemembers) => workspacemembers.Workspace,
      { cascade: ['insert'] },
    )
    WorkspaceMembers: WorkspaceMembers[];
  
    @ManyToOne(() => Users, (users) => users.Workspaces, {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'OwnerId', referencedColumnName: 'id' }]) // JoinColumn의 경우 양쪽 관계가 있다면 ForeignKey가 있는 곳에 하자.
    Owner: Users;
  
    @ManyToMany(() => Users, (users) => users.Workspaces) // ManyToMany 버그 자주나는데 OneToMany 두개로 가능
    Members: Users[];
  }