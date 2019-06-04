import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { Key } from '../entities/key.entity';
import { debug } from 'debug';
import { KeyInput, UpdateKeyInput } from './types/key/key.input';
import { UpdateOutput } from './types/key/key.type';

const log = debug('app').extend('key:resolver');

@Resolver()
export class KeyResolver {
    @Query(returns => String, { name: 'key' })
    getKey() {
        return 'key';
    }

    @Query(returns => [Key], { name: 'keys' })
    async getKeys() {
        try {
            const keys = await Key.find();
            return keys;
        } catch (error) {
            log(error);
            throw new Error('fail search');
        }
    }

    @Mutation(returns => Key, { name: 'createkey', description: '키 생성' })
    async createKey(@Arg('data', {
        nullable: false,
        description: 'Key의 이름으로 dot와 영어 소문자만 사용가능',
    })
    {
        name,
    }: KeyInput) {
        try {
            const key = (await Key.create({
                name,
            }).save()) as Key;
            return key;
        } catch (error) {
            log(error);
            throw new Error('fail create');
        }
    }

    @Mutation(returns => UpdateOutput.Union, { name: 'updatekey', description: '키 수정' })
    async updateKey(
        @Arg('data', {
            nullable: false,
            description: 'Key의 이름으로 dot와 영어 소문자만 사용가능',
        })
        data: UpdateKeyInput,
    ) {
        try {
            const key = await Key.createQueryBuilder('key')
                .update()
                .set({
                    name: data.name,
                })
                .where('id = :id', { id: data.id })
                .execute();

            if (key.raw.affectedRows < 1) {
                return new UpdateOutput.Error('업데이트 할 id가 존재하지 않습니다.');
            }

            return new UpdateOutput.Ok('업데이트 성공');
        } catch (error) {
            log(error);
            return new UpdateOutput.Error('업데이트 실패');
        }
    }
}
