import { Injectable, CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class NotLoggedInGuard implements CanActivate{ // guard는 CanActivate implements 해줘야함.
    canActivate(
        context: ExecutionContext,
    ):boolean|Promise<boolean>|Observable<boolean>{
        const request = context.switchToHttp().getRequest(); // express의 Request 가져온거임.
        return !request.isAuthenticated(); // 그대로 req.isAuthenticated() 사용.
        // CanActivate가 true여야만 다음으로 넘어가기 가능.
    }
}