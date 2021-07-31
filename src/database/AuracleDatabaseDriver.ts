import * as fs from 'fs'
import { createConnection } from 'typeorm';
import { dbConfig } from './config'

export const AuracleDatabaseDriver = createConnection(dbConfig);

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

const modelDir = __dirname + '/models'
const models = fetchAllTypescriptFiles(modelDir)

/**
 * If the environement is production, sync the DB
 */
if (process.env.NODE_ENV != 'production') {
    // Todo
}
