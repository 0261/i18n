import { testConnection } from '../testHelpers/testConnection';
import { Connection } from 'typeorm';
import { gCall } from '../testHelpers/gCall';
import { debug } from 'debug';

let conn: Connection;

beforeAll(async () => {
    conn = await testConnection(true);
});

afterAll(async () => {
    await conn.close();
});

const getTranslationQuery = `
query {
    getTranslation {
        id
        locale
        value
    }
}
`;

describe('Translation', () => {
    it('get translation', async () => {
        const result = await gCall({
            source: getTranslationQuery,
        });
    });
});
