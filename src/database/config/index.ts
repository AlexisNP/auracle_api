import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"

import * as fs from 'fs'

const tablePrefix = 'au_'

/**
 * Fetches all Typescript files from a given directory
 *
 * @param dir The folder to scan where the models are located
 * @param acc (Optional) The array to start
 * @returns All .ts files within the dir
 */
export const fetchAllTypescriptFiles = (dir: string, acc: string[] = []): string[] => {
    fs.readdirSync(dir)
        .forEach(file => {

            const fileIsTypescript = (file.split('.').pop() === 'ts')
            const fileIsFolder = (file.indexOf('.') === -1)

            if (fileIsFolder) {
                fetchAllTypescriptFiles(`${dir}/${file}`, acc)
            }

            if (fileIsTypescript) {
                acc.push(`${dir}/${file}`)
            }
        })

    return acc
}

const modelDir = './src/database/models/'
const models = fetchAllTypescriptFiles(modelDir)

/**
 * Registers the options to create the sequelize instance
 */
export const dbConfig: MysqlConnectionOptions = {
    /**
     * Access to database
     */
    type: 'mariadb',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    logging: false,

    entityPrefix: tablePrefix,
    entities: models
}
