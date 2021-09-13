import { HttpException, Injectable } from '@nestjs/common';
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
            throw new HttpException('이메일이 없습니다.', 400); // async함수 내에서는 throw해도 서버가 종료되지 않음.
            // 이메일 없음 오류
            // async에서는 throw하면 예외가 삼켜짐(에러가 아니라 Unhandled~~~ 경고로 뜸.)
            // 따라서 응답으로 오류 메시지를 받지 못하는 효과가 나버림. 이를 막기 위해 컨트롤러에서 await을 해줘야 제대로 돌아감.
            // 얘는 꺼짐.
            // 서비스 전과 후로 실행되는 인터셉터로 해결 가능하긴 할지도...?
            // 그래도 있는 예외처리 전문 Exception을 사용하자. 
            return;
        }
        if(!nickname){
            // 닉네임 없음 오류
            throw new HttpException('닉네임이 없습니다.', 400);
            return;
        }
        if(password){
            // 비밀번호 없음 오류
            throw new HttpException('비밀번호가 없습니다.', 400);
            return;
        }
        const user = await this.usersRepository.findOne({where:{email}});
        if(user){
            throw new HttpException('이미 존재하는 사용자입니다.', 400)
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