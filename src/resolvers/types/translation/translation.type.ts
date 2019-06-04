import { Field, ObjectType } from 'type-graphql';
@ObjectType()
export class DetectLanguageOutput {
    @Field({ description: '지역' })
    locale!: string;
}
