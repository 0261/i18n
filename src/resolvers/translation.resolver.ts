import { Resolver, Query, Arg, Field, InputType, Mutation, ObjectType } from 'type-graphql';
import { Translation } from '../entities/translation.entity';
import { debug } from 'debug';
import { DetectLanguageService } from '../services/detectLanguage';
import { TranslationInput, LocaleInput } from './types/translation/translation.input';
import { DetectLanguageOutput } from './types/translation/translation.type';
const log = debug('app').extend('translation:resolver');

@Resolver()
export class TranslationResolver {
    constructor(private readonly detectLanguage: DetectLanguageService) {}

    @Query(returns => [Translation])
    async getTranslation() {
        try {
            const translation = await Translation.find({ relations: ['key'] });
            log(translation);
            return translation;
        } catch (error) {
            log(error);
        }
    }

    @Query(returns => [Translation], {
        name: 'translations',
        description: '키의 모든 번역 확인하기',
    })
    async getTranslationsById(@Arg('id', { nullable: false, description: '키의 id' }) id: number) {
        try {
            const translations = (await Translation.find({
                relations: ['key'],
                where: {
                    key: {
                        id,
                    },
                },
            })) as Array<Translation>;
            return translations;
        } catch (error) {
            log(error);
            throw new Error('fail search');
        }
    }

    @Query(returns => Translation, {
        name: 'localetranslation',
        description: '키의 특정 언어 번역 확인하기',
    })
    async getTranslationByIdAndLocale(@Arg('data', {
        nullable: false,
    })
    {
        locale,
        id,
    }: TranslationInput) {
        try {
            const translation = (await Translation.findOne({
                where: {
                    id,
                    locale,
                },
            })) as Translation;
            if (!translation) {
                throw null;
            }
            return translation;
        } catch (error) {
            log(error);
            throw new Error('fail search');
        }
    }

    @Mutation(returns => Translation, { name: 'createtranslation' })
    async createTranslation(
        @Arg('keyId', { nullable: false, description: '키 id' }) keyId: number,
        @Arg('data', { nullable: false })
        { value, locale }: LocaleInput,
    ) {
        try {
            const translation = await Translation.create({
                key: { id: keyId },
                value,
                locale,
            }).save();
            return translation;
        } catch (error) {
            log(error);
            throw new Error('fail create');
        }
    }

    @Mutation(returns => String, { description: '키의 특정 언어 번역 수정하기' })
    async updateTranslationByIdAndLocale(
        @Arg('keyId', { nullable: false, description: '키 id' }) keyId: number,
        @Arg('data', { nullable: false })
        { value, locale }: LocaleInput,
    ) {
        try {
            const result = await Translation.createQueryBuilder()
                .update()
                .set({
                    value,
                })
                .where(`keyId = :keyId and locale = :locale`, {
                    locale,
                    keyId,
                })
                .execute();
            if (result.raw.affectedRow < 1) {
                throw null;
            }
            return 'success';
        } catch (error) {
            log(error);
            throw new Error('fail update');
        }
    }

    @Query(returns => DetectLanguageOutput, { name: 'detectlanguage' })
    async languageDetect(
        @Arg('message', { nullable: false, description: '번역을 확인하고 싶은 값' })
        message: string,
    ) {
        try {
            const locale = await this.detectLanguage.detect(message);
            return locale;
        } catch (error) {
            log(error);
            throw new Error('fail detect language');
        }
    }
}
