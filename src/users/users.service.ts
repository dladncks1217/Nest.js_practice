import { BadRequestException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
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
    async join(email:string, nickname:string, password:string){ // 뭐 안들어가면 validator에서 알아서 잡아줌(entities/User.ts)
        // validator -> DTO위에다 붙여두면 자동으로 validation 됨.
        const user = await this.usersRepository.findOne({where:{email}});
        if(user){
            throw new UnauthorizedException('이미 존재하는 사용자입니다.')
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