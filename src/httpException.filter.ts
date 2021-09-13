import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch(HttpException)
  // 얘는 main.ts에서 useGlobalFilters해서 사용해야 함.
  export class HttpExceptionFilter implements ExceptionFilter { // implements 해서 catch 들어갈 수 밖에 없음.
    catch(exception: HttpException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const status = exception.getStatus(); // exception정보가 catch의 첫 인자로 전달됨. 그걸 가져와 status로 넣어주는거임.
      const err = exception.getResponse() as // 에러내용
        | string
        | { error: string; statusCode: 400; message: string[] };
      // let msg = '';
      if (typeof err !== 'string' && err.error === 'Bad Request') {
        return response.status(status).json({
          success: false,
          code: status,
          data: err.message,
        });
      }
  
      response.status(status).json({
        success: false,
        code: status,
        data: err,
      });
    }
  }