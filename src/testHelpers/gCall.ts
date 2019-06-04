import { graphql } from 'graphql';
import { buildSchema } from 'type-graphql';
import Container from 'typedi';
import { createSchema } from '../utils/createSchema';
import Maybe from 'graphql/tsutils/Maybe';

interface Options {
    source: string;
    variableValues?: Maybe<{
        [key: string]: any;
    }>;
}

export const gCall = async ({ source, variableValues }: Options) => {
    return graphql({
        schema: await createSchema(),
        source,
        variableValues,
    });
};
