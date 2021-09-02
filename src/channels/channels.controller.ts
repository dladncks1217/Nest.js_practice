import { Controller, Get, Post, Query, Param, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('CHANNEL')
@Controller('channels')
export class ChannelsController {
    @Get()
    getAllChannels(){

    }
    @Post()
    createChannel(){

    }

    @Get()
    getSpecificChannels(){

    }

    @Get('name/chats')
    getChats(@Query() query, @Param() param){
        
        console.log(query.perPage, query.page);
        console.log(param.id, param.url)
    }

    @Post('name/chats')
    postChat(@Body() body){}

    @Get(':name/member')
    getAllMembers(){

    }
    
    @Post(':name/member')
    inviteMembers(){
        
    }
}
