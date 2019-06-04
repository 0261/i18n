import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { debug } from 'debug';
import { Key } from '../entities/key.entity';
const log = debug('app').extend('isExistKey');
export function isExistKey(property: string, validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            name: 'isExistKey',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                async validate(name: string, args: ValidationArguments) {
                    const key = (await Key.findOne({
                        name,
                    })) as Key;
                    if (key) {
                        return false;
                    }
                    return true;
                },
            },
        });
    };
}
