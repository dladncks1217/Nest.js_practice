// controller에서는 최대한 req,res같은거안쓰는게 좋음.
import { Controller, Post, Get, Req, Res, Body, UseInterceptors, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/common/decorators/user.decorator';
import { UserDTO } from 'src/common/dto/user.dto';
import { UndefinedToNullInterceptor } from 'src/common/interceptors/undefinedToNull.interceptor';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@UseInterceptors(UndefinedToNullInterceptor)
@ApiTags('USER')
@Controller('api/users')
export class UsersController {
    constructor(private userService: UsersService){}

    @ApiResponse({
        type:UserDTO
    })
    @ApiOperation({summary:'내 정보 조회'})
    @Get()
    getUsers(@User() user){
        return user;
    }

    @ApiOperation({summary:'회원가입'}) // 컨트롤러 자체를 탐지해 swagger를 만들어주는데, 거기에 세부적인 사항들은 직접 제작해야함.
    @Post()
    async join(@Body() body:JoinRequestDto){ // JoinRequestDto가 들어간다는건 nest가 판단했지만 그게 자세히 뭔지는 모름 이건 설정해줘야함. (join.request.dto.ts로 가서 지정해주자.)
        await this.userService.join(body.email, body.nickname, body.password);
        // 서비스에서 발생한 오류가 컨트롤러로 전파가 되어야 httpException.fitler.ts에 걸려서 응답이 갈 수 있음.
    }

    @ApiResponse({
        status:200,
        description:'성공',
        type:UserDTO
    })
    @ApiResponse({
        status:500,
        description:'서버 에러',
    })
    @UseGuards()
    @ApiOperation({summary:'로그인'})
    @Post('login')
    logIn(@User() user){
        return user;
    }

    @ApiOperation({summary:'로그아웃'})
    @Post('logout')
    logOut(@Req() req, @Res() res){
        req.logOut();
        res.clearCookie('connect.sid',{httpOnly:true});
        res.send('ok');
    }
}
