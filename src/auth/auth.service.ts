import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from 'bcrypt';
import { Users } from "src/entities/Users";
import { UsersService } from "src/users/users.service";
import { Repository } from "typeorm";

@Injectable()
export class AuthService{
    constructor(@InjectRepository(Users) private usersRepository: Repository<Users>){}

    async validateUser(email:string, password: string){
        const user = await this.usersRepository.findOne({
            where:{email},
            select:['id','email', 'password', 'nickname'],
        });
        console.log(email, password, user);
        if(!user){
            return null;
        }
        const result = await bcrypt.compare(password, user.password);
        if(result){
            const { password, ...userWithoutPassword } = user;
            // delete user.password;(필요없는 것만 하나 빼기 위 방법 말고 이렇게도 가능.)
            return userWithoutPassword;
        }
        return null;
    }
}

