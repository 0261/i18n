import { testConnection } from '../testHelpers/testConnection';
import { Connection } from 'typeorm';
import { gCall } from '../testHelpers/gCall';

let conn: Connection;

beforeAll(async () => {
    conn = await testConnection(true);
});

afterAll(async () => {
    await conn.close();
});

const createKey = `
mutation{
    createkey(data:{
      name:"bada.first.test"
    }){
      id
      name
    }
  }
`;
const getKey = `
query{
    keys{
      id
      name
    }
  }
`;

describe('Key', () => {
    it('create Key', async () => {
        const createResult = await gCall({
            source: createKey,
        });
    });
    it('get Keys', async () => {
        const getResults = await gCall({
            source: getKey,
        });
    });
});
