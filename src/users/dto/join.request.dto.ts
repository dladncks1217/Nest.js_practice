import { ApiProperty, PickType } from "@nestjs/swagger";
import { Users } from "src/entities/Users";

export class JoinRequestDto extends PickType(Users, [
    'email', 
    'nickname', 
    'password'
] as const){}
// entities에서 잘 만들어두면 같은 코드를 똑같이 안써도 됨. 내용이 필요없어짐
// PickType에서 가져옴.
// 중복 코드를 없애기 좋음.
// 공식문서보자
// 기존 dto에서 필요한 속성들만 뽑는 PickType이라는 게 있음.
// 공식문서 OpenAPI/ Mapped Types