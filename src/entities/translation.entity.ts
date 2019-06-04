import { Column, BaseEntity, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Key } from './key.entity';
import { ObjectType, Field } from 'type-graphql';

enum Locale {
    KO = 'ko',
    JA = 'ja',
    EN = 'en',
}

@Entity()
@ObjectType()
export class Translation extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field()
    @Column({
        type: 'enum',
        default: Locale.KO,
        enum: Locale,
        comment: 'ISO 639 Alpha-2 형식. ko, en, ja만 유효',
    })
    locale!: Locale;

    @Field()
    @Column('varchar', { comment: '번역된 문장' })
    value!: string;

    @Field(type => Key)
    @ManyToOne(type => Key, key => key.translations, { nullable: false })
    key!: Key;
}
