import { Service } from 'typedi';
const DetectLanguage = require('detectlanguage');

@Service()
export class DetectLanguageService {
    private detectLanguage: any;
    constructor() {
        this.detectLanguage = new DetectLanguage({
            key: process.env.DETECT_LANGUAGE_API,
        });
    }

    async detect(
        message: string,
    ): Promise<{
        locale: string;
    }> {
        try {
            const locale = (await new Promise((resolve, reject) =>
                this.detectLanguage.detect(message, (error: any, result: any) => {
                    if (error) {
                        reject('fail detect language api');
                    }
                    resolve({
                        locale: result[0].language,
                    });
                }),
            )) as { locale: string };
            return locale;
        } catch (error) {
            throw error;
        }
    }
}
