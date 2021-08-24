// controller에서는 최대한 req,res같은거안쓰는게 좋음.
import { Controller, Post, Get, Req, Res, Body } from '@nestjs/common';
import { JoinRequestDto } from './dto/join.request.dto';
import { UsersService } from './users.service';

@Controller('api/users')
export class UsersController {
    constructor(private userService: UsersService){

    }
    @Get()
    getUsers(@Req() req){
        return req.user;
    }

    @Post()
    postUsers(@Body() body:JoinRequestDto){
        this.userService.postUsers(body.email, body.nickname, body.password);
    }

    @Post('login')
    logIn(@Req() req){
        return req.user;
    }

    @Post('logout')
    logOut(@Req() req, @Res() res){
        req.logOut();
        res.clearCookie('connect.sid',{httpOnly:true});
        res.send('ok');
    }
}
