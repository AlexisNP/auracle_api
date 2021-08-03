/**
 * Dependencies
 */

// .env Data
import * as dotenv from 'dotenv'
dotenv.config();

// Packages

// TypeORM
import "reflect-metadata";

import morgan from 'morgan'
import helmet from 'helmet'
import express from 'express'

import { AuracleApi } from './common/classes/AuracleApi'
import { AuracleDatabaseDriver } from './database/AuracleDatabaseDriver'

import { SpellRouter } from './routes/SpellRouter';

const apiPort = process.env.API_PORT

const api = new AuracleApi({
    port: apiPort,
    database: AuracleDatabaseDriver,

    middlewares: [],
    routers: [
        new SpellRouter
    ],
    modules: [
        express.json({ limit: '10kb' }),
        morgan('dev'),
        helmet()
    ],
})
