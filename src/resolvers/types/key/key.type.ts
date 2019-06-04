import { Field, ObjectType, createUnionType } from 'type-graphql';

export type UpdateOutput = UpdateOutput.Ok | UpdateOutput.Error;

export namespace UpdateOutput {
    @ObjectType()
    export class Ok {
        @Field()
        success!: true;
        @Field()
        message!: string;
        constructor(message: string) {
            this.success = true;
            this.message = message;
        }
    }

    @ObjectType()
    export class Error {
        @Field()
        success!: false;
        @Field()
        message!: string;
        constructor(message: string) {
            this.success = false;
            this.message = message;
        }
    }

    export const Union: UpdateOutput = createUnionType({
        name: 'UpdateOutput',
        types: [Ok, Error],
    });
}
