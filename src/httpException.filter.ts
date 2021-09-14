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
        | { message: any, statusCode: number }
        | { error: string; statusCode: 400; message: string[] }; // class-validator
      // let msg = '';
      if (typeof err !== 'string' && err.statusCode === 400) {
        return response.status(status).json({
          success: false,
          code: status,
          data: err.message,
        });
      }
  
      response.status(status).json({
        success: false,
        code: status,
        data: err.message
      });
    }
  }

  // interceptor의 경우 controller, service 앞이나 뒤에서 실행.
  // ExceptionFilter는 무조건 controller 뒤에서 실행.
  // 공식문서 RequestLifeCycle 확인. 선후관계를 알아두면 좋을듯.
  // interceptor가 pipe보다 데이터 접근을 먼저할 수 있기에 원래 validation Pipe에서 에러날거 interceptor에서 데이터를 임의로 부여해 request를 조작해 pipe를 통과하기가 가능.
  // middleware에서 발생하는 오류는 ExceptionFilter로 안간다. (최대한 Nest LifeCycle안에서 돌게 미들웨어는 어지간해서는 안쓰는게 좋을듯.)
  // request Lifecycle 시각화 한 자료가 있음.
  // https://slides.com/yariv-gilad/nest-js-request-lifecycle/