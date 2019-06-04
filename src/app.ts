import { ApolloServer } from 'apollo-server-express';
import Express from 'express';
import { debug } from 'debug';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import { createConnection } from 'typeorm';

import './env';
import { ormOption } from './ormconfig';
import { createSchema } from './utils/createSchema';
const log = debug('app').extend('server');

class Application {
    private app = Express();

    initMiddlewares() {
        this.app.use(helmet());
        this.app.use(morgan('dev'));
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(cors());
    }

    async start() {
        try {
            await createConnection(ormOption);

            const schema = await createSchema();

            const server = new ApolloServer({
                schema,
                context: ({ req, res }) => ({ req, res }),
            });
            server.applyMiddleware({
                app: this.app,
            });

            this.initMiddlewares();
            this.app.listen(4000, () => log(`start http://localhost:4000/graphql`));
        } catch (error) {
            log(error);
        }
    }
}

export namespace ApplicationFactory {
    export function create(): Application {
        return new Application();
    }
}
