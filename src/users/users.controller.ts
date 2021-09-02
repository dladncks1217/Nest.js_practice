// controller에서는 최대한 req,res같은거안쓰는게 좋음.
import { Controller, Post, Get, Req, Res, Body } from '@nestjs/common';
import { ApiOperation } from '@nestjs/swagger';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(private userService: UsersService){

    }
    @ApiOperation({summary:'내 정보 조회'})
    @Get()
    getUsers(@Req() req){
        return req.user;
    }

    @ApiOperation({summary:'회원가입'}) // 컨트롤러 자체를 탐지해 swagger를 만들어주는데, 거기에 세부적인 사항들은 직접 제작해야함.
    @Post()
    postUsers(@Body() body:JoinRequestDto){ // JoinRequestDto가 들어간다는건 nest가 판단했지만 그게 자세히 뭔지는 모름 이건 설정해줘야함. (join.request.dto.ts로 가서 지정해주자.)
        this.userService.postUsers(body.email, body.nickname, body.password);
    }

    @ApiOperation({summary:'로그인'})
    @Post('login')
    logIn(@Req() req){
        return req.user;
    }

    @ApiOperation({summary:'로그아웃'})
    @Post('logout')
    logOut(@Req() req, @Res() res){
        req.logOut();
        res.clearCookie('connect.sid',{httpOnly:true});
        res.send('ok');
    }
}
