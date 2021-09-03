import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator( // 커스텀 데코레이터 쓰는 이유: 특정 플랫폼에 종속되지 않기 위함.
    (data:unknown, ctx:ExecutionContext)=>{
        const request = ctx.switchToHttp().getRequest();
        return request.user;
    }
)