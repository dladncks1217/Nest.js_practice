import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy){
    constructor(private authService:AuthService){ // express의 localstrategy와 많이 비슷함.
        super({usernameFeild:'email', passportFeild:'password'});
    }

    async validate(email: string, password: string, done: CallableFunction){
        const user = await this.authService.validateUser(email, password);
        if(!user){
            throw new UnauthorizedException(); // 401던져주는 친구. 여기에 걸리면 httpExceptionFilter.ts에 걸림.
        }
        return done(null, user);
    }

}