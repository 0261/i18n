import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { debug } from 'debug';
export function isDotOrLower(property: string, validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            name: 'isDotOrLower',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(name: string, args: ValidationArguments) {
                    // 정규식 추가
                    const result = name.replace(/([a-z]+|\.)/g, '');
                    if (result) {
                        return false;
                    }
                    return true;
                },
            },
        });
    };
}
