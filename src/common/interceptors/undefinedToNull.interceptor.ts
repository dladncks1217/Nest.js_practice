// 인터셉터의 역할? : AOP(Aspect Oriented Programming)
// 각 라우터마다 실행되는 순서가 있을텐데 그 라우터들에도 공통적으로 실행되는 순서가 있을거임 (시작, 끝 동직이 공통인 경우 등)
// 그걸 묶어보자 하는게 인터셉터의 역할 
// nest기능중 하나인 인터셉터로 구현해보자.
// express에서 res.json같은거로 리턴해주고 나면 그 값을 다시한번 가공해주고싶은 경우가 있음(express에서는 좀 애매함) 이걸 인터셉터로 해결 가능.
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";


@Injectable()
export class UndefinedToNullInterceptor implements NestInterceptor{
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ):Observable<any> | Promise<Observable<any>>{
        // 컨트롤러 실행 전 부분 
        return next.handle().pipe(map((data)=>((data)=>data===undefined?null:data))); // data : 컨트롤러가 리턴해주는 데이터
    }
}

// 위처럼 데이터를 한번 더 가공해주는 그런 역할로 많이 써먹음.