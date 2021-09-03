import { createParamDecorator, ExecutionContext } from "@nestjs/common";

export const User = createParamDecorator( // 커스텀 데코레이터 쓰는 이유: 특정 플랫폼에 종속되지 않기 위함.
    (data:unknown, ctx:ExecutionContext)=>{ // ExecutionContext는 js것과 다름.
        const response = ctx.switchToHttp().getResponse(); // 실행 컨텍스트 안에서 http서버 가져와서 그 안의 응답객체 가져와라. 
        // 이 실행컨텍스트 객체 접근 가능하면 이 함수 안에서 동시에 http정보, 웹소켓정보, rpc정보 등을 가져올 수 있음. (웹소켓 <-> http 소통 쉽게 해준다거나 그런거 한번에 ctx로 관리 가능)
        // 그래서 실행 컨텍스트라는게 있음. ctx객체 하나로 http 웹소켓 rpc 다 접근이 가능. http 웹소켓 같이 써먹을 때 같은 경우 ctx 활용 가능
        return response.locals.jwt;
    }
)

// @Token() token 과 같이 사용 가능. 어떻게 보면 중복제거도 될 수 있음.