import { InputType, Field } from 'type-graphql';
import { isDotOrLower } from '../../../validators/isDotOrLower';

@InputType()
export class KeyInput {
    @Field()
    @isDotOrLower('isDotOrLower', { message: 'Key의 이름으로 dot와 영어 소문자만 사용가능 ' })
    name!: string;
}

@InputType()
export class UpdateKeyInput extends KeyInput {
    @Field({ description: '업데이트 할 아이디 값' })
    id!: number;
}
