import {
    Column,
    CreateDateColumn,
    Entity,
    Index,
    JoinColumn,
    ManyToMany,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  import { ChannelChats } from './ChannelChats';
  import { ChannelMembers } from './ChannelMembers';
  import { Users } from './Users';
  import { Workspaces } from './Workspaces';
  
  @Index('WorkspaceId', ['WorkspaceId'], {})
  @Entity({ schema: 'sleact' })
  export class Channels {
    @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
    id: number;
  
    @Column('varchar', { name: 'name', length: 30 })
    name: string;
  
    @Column('tinyint', {
      name: 'private',
      nullable: true,
      width: 1,
      default: () => "'0'",
    })
    private: boolean | null; // 공개방 여부
  
    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  
    @Column('int', { name: 'WorkspaceId', nullable: true })
    WorkspaceId: number | null; // 관계들어간거는 가상의 컬럼같은 것은 앞에 대문자로 하는거 좋을듯
  
    @OneToMany(() => ChannelChats, (channelchats) => channelchats.Channel)
    ChannelChats: ChannelChats[];
  
    @OneToMany(() => ChannelMembers, (channelMembers) => channelMembers.Channel, { 
      cascade: ['insert'], // 두 개의 테이블 동시에 수정 시 cascade 옵션 켜줘야함.
    })
    ChannelMembers: ChannelMembers[];
  
    @ManyToMany(() => Users, (users) => users.Channels)
    Members: Users[];
  
    @ManyToOne(() => Workspaces, (workspaces) => workspaces.Channels, {
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    })
    @JoinColumn([{ name: 'WorkspaceId', referencedColumnName: 'id' }]) // ForeignKey가 들어가는 부분에테이블명 넣어주고 referencedColumnName은 그 외래키테이블의 컬럼
    Workspace: Workspaces; // Workspace라는 객체가 생기며 매개체는 workspace id라는컬럼. 자동으로 조인이 됨.
  }