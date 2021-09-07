// 초기 데이터값을 미리 넣어주는거임
// 이걸 시딩이라고 함.
// 테스트 시에는 faker라는 모듈 받아서 가짜 데이터들 생성해서 seeder와 엮어 쓰기 가능.
// 마이그레이션은 디비를 중간에 바꾸고싶을 경우 일반 쿼리문으로 수정하면 엔티티를 다 수정해버려야됨
// 그렇게 안하고 마이그레이션을 쓰면 한번에 다 수정 가능
// npx typeorm migration:create -n categoryToType 하면 파일생기는데 여기 쿼리 써서 수정 가능
// npx typeorm migration:generator -n categoryToType 해서 자동으로 생기게 하기도 가능(수정된 엔티티 파일을 보고 쿼리를 작성해준다.)
// ()
import { Connection } from 'typeorm';
import { Seeder, Factory } from "typeorm-seeding";
import { Workspaces } from '../../entities/Workspaces';
import { Channels } from '../../entities/Channels';

export class CreateInitialData implements Seeder{
    public async run(factory:Factory, connection:Connection):Promise<any>{
        await connection
        .createQueryBuilder() // 쿼리빌더
        .insert()
        .into(Workspaces)
        .values([{id:1, name:'Sleact', url:'sleact'}])
        .execute();
        await connection
        .createQueryBuilder()
        .insert()
        .into(Channels)
        .values([{id:1, name:'일반', WorkspaceId:1, private:false}])
        .execute();
    }
}