import { ApiProperty } from "@nestjs/swagger";

export class JoinRequestDto{
    @ApiProperty({
        example:'dlaxodud1217@naver.com',
        description:'이메일',
        required:true,

    })
    public email: string;

    @ApiProperty({
        example:'이건내닉네임',
        description:'닉네임',
        required:true,
        
    })
    public nickname: string;

    @ApiProperty({
        example:'qwerty!@#',
        description:'비밀번호',
        required:true,
        
    })
    public password: string;
}