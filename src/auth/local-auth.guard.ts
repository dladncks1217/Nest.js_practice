import { ExecutionContext, Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";


@Injectable() // injectable 붙은 애들이면 다 provider이다.
export class localAuthGuard extends AuthGuard('local'){ // implements 없는 이유는 AuthGuard 없는 이유는 AuthGuard 안에 이미 implements 있음.
    async canActivate(context: ExecutionContext): Promise<boolean>{
        const can = await super.canActivate(context);
        if(can){
            const request = context.switchToHttp().getRequest();
            console.log('login for cookie');
            await super.logIn(request);
        }
        return true;
    }
}
// 공식문서에 그대로 있다.
