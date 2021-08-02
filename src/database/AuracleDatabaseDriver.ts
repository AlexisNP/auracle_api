import { createConnection } from 'typeorm';
import { dbConfig } from './config'

export const AuracleDatabaseDriver = createConnection(dbConfig);

/**
 * If the environement is production, sync the DB
 */
if (process.env.NODE_ENV != 'production') {
    // Todo
}
