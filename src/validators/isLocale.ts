import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import { debug } from 'debug';
export function isLocale(property: string, validationOptions?: ValidationOptions) {
    return (object: object, propertyName: string) => {
        registerDecorator({
            name: 'isLocale',
            target: object.constructor,
            propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(locale: string, args: ValidationArguments) {
                    // 정규식 추가
                    const AVAILABLE_LOCALE = ['ko', 'en', 'jp'];
                    if (!AVAILABLE_LOCALE.includes(locale)) {
                        return false;
                    }
                    return true;
                },
            },
        });
    };
}
