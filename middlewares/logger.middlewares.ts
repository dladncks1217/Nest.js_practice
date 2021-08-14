import { Injectable, Logger, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from "express";

@Injectable()
export class LoggerMiddleware implements NestMiddleware{
    private logger = new Logger('HTTP'); 

    use(request:Request, response:Response, next:NextFunction):void{
        const {ip, method, originalUrl} = request; // 라우터보다 먼저 실행됨
        const userAgent = request.get('user-agent')||'';

        response.on('finish',()=>{ // 얘네 실행되고 비동기(on)을 쓰게되면서 next() 끝나고 실행.
            const {statusCode} = response;
            const contentLength = response.get('connect-length');
            this.logger.log( // nest에서는 console.log() 보단 logger.log 많이씀.
                `${method} ${originalUrl} ${statusCode} ${contentLength} - ${userAgent} ${ip}`,
            );
        });
        next();
    }
}