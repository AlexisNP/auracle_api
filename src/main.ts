import * as dotenv from 'dotenv';
dotenv.config();

// Dependencies
import morgan from 'morgan';
import helmet from 'helmet';

import express from 'express'

import { AuracleApi } from './common/classes/AuracleApi'

const port = Number(process.env.API_PORT);

const app = new AuracleApi({
    port: port,
    middlewares: [],
    modules: [
        express.json({ limit: '10kb' }),
        morgan('dev'),
        helmet()
    ],
});

app.listen()

process.on('SIGINT', () => app.close());
  
// const routes = require('./routes');

// Builds app w/ express
// let app = express();
// app.use(bodyParser.json({ limit: '10kb' }));
// app.use(cors({
//     origin: [
//         "http://localhost:8080",
//     ],
//     credentials: true,
// }));
// app.use(morgan('dev'));
// app.use(helmet());

// // Server
// app.listen(port, () => console.log(`App listening on port ${port}`));

// // Entry route
// app.use('/api/v1/', routes.auth);

// // Routing
// app.use('/api/v1/spells', routes.spells);
// app.use('/api/v1/schools', routes.schools);
// app.use('/api/v1/meta_schools', routes.meta_schools);
// app.use('/api/v1/variables', routes.variables);
// app.use('/api/v1/ingredients', routes.ingredients);
// app.use('/api/v1/users', routes.users);