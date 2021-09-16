import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class LoggedInGuard implements CanActivate{ // guard는 CanActivate implements 해줘야함.
    canActivate(
        context: ExecutionContext,
    ):boolean|Promise<boolean>|Observable<boolean>{
        const request = context.switchToHttp().getRequest(); // express의 Request 가져온거임.
        return request.isAuthenticated(); // 그대로 req.isAuthenticated() 사용.
        // 리턴값이 true여야 다음 컨트롤러 사용 가능.
    }
}