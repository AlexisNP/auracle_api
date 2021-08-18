import { createConnection } from 'typeorm';
import { dbConfig } from './config'

export const AuracleDatabaseDriver = createConnection(dbConfig);
