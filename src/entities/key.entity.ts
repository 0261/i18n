import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Translation } from './translation.entity';
import { ObjectType, Field } from 'type-graphql';

@Entity()
@ObjectType()
export class Key extends BaseEntity {
    @PrimaryGeneratedColumn()
    @Field()
    id!: number;

    @Field()
    @Column('varchar', {
        comment: 'Key의 이름으로 dot와 영어 소문자만 사용가능 (unique)',
        unique: true,
    })
    name!: string;

    @OneToMany(type => Translation, translation => translation.key)
    translations!: Array<Translation>;
}
