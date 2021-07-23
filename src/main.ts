/**
 * Dependencies
 */

// .env Data
import * as dotenv from 'dotenv'
dotenv.config();

// Packages
import morgan from 'morgan'
import helmet from 'helmet'
import express from 'express'

import { AuracleApi } from './common/classes/AuracleApi'
import { AuracleDatabaseDriver } from './database/AuracleDatabaseDriver'

const apiPort = process.env.API_PORT

const app = new AuracleApi({
    port: apiPort,
    middlewares: [],
    modules: [
        express.json({ limit: '10kb' }),
        morgan('dev'),
        helmet()
    ],
    database: AuracleDatabaseDriver
})

// Listens on apiPort...
app.listen()

// const routes = require('./routes');

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
