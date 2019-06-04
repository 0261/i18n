import { buildSchema } from 'type-graphql';
import Container from 'typedi';

export const createSchema = async () =>
    await buildSchema({
        resolvers: [`${__dirname}/../resolvers/**/*.resolver.ts`],
        container: Container,
        emitSchemaFile: true,
    });
