import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'; // entity에 query날리는건 repository임.
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';


@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(Users)  // 이거 인젝션하는법 module파일에서 TypeOrmModule.forFeature쓰자.
        private usersRepository: Repository<Users>,
    ){}
    async join(email:string, nickname:string, password:string){
        if(!email){
            // 이메일 없음 오류
            throw new Error('이메일이 없습니다.');
            return;
        }
        if(!nickname){
            // 닉네임 없음 오류
            throw new Error('닉네임이 없습니다.');
            return;
        }
        if(password){
            // 비밀번호 없음 오류
            throw new Error('비밀번호가 없습니다.');
            return;
        }
        const user = await this.usersRepository.findOne({where:{email}});
        if(user){
            throw new Error('이미 존재하는 사용자입니다.')
            return;
        }
        const hashedPassword = await bcrypt.hash(password,12);
        await this.usersRepository.save({
            email,
            nickname,
            password: hashedPassword,
        })
    }
}


// 로직 정리
// 모듈 -> 컨트롤러 -> 서비스 -> 레포지토리 통해서 entity로 쿼리 날림.