import { InputType, Field } from 'type-graphql';
import { isLocale } from '../../../validators/isLocale';

enum Locale {
    KO = 'ko',
    JA = 'ja',
    EN = 'en',
}
@InputType()
export class TranslationInput {
    @Field({ description: 'key의 id' })
    id!: number;

    @isLocale('isLocale', { message: '번역이 불가능한 지역입니다.' })
    @Field({ description: '번역을 확인하고 싶은 지역 ko, en, jp' })
    locale!: Locale;
}

@InputType()
export class LocaleInput {
    @isLocale('isLocale', { message: '번역이 불가능한 지역입니다.' })
    @Field({ description: '번역을 확인하고 싶은 지역 ko, en, jp' })
    locale!: Locale;

    @Field({ description: '등록할 값' })
    value!: string;
}
