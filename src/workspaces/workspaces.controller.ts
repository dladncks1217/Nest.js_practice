import { Controller, Get, Post, Delete } from '@nestjs/common';

@Controller('api/workspaces')
export class WorkspacesController {
    @Get()
    getMyWorkspaces(){

    }

    @Post()
    createWorkspace(){

    }

    @Get(':url/members')
    getAllMembersFromWorkspace(){

    }

    @Post(':url/members')
    inviteMembersWorkspace(){

    }

    @Delete(':url/members/:id')
    kickMemberFromWorkspace(){

    }
    
    @Get(':url/members/:id')
    getMemberInfoWorkspace(){

    }

    @Get(':url/users/:id')
    DEPRECATED_getMemberInfoWorkspace(){
        this.getMemberInfoWorkspace();
    }
}
