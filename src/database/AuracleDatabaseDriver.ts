import { Sequelize } from 'sequelize'
import * as fs from 'fs'
import { dbConfig } from './config'

export let AuracleDatabaseDriver: Sequelize;

// Creates the sequelize instance
AuracleDatabaseDriver = new Sequelize(dbConfig)

/**
 * If the environement is production...
 */
if (process.env.NODE_ENV != 'production') {
    AuracleDatabaseDriver.sync({
        force: true
    })
}

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

            const fileIsTypescript = (
                (file.split('.').pop() === 'ts')
            )
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

models.forEach(modelPath => {
    const registerModel = require(modelPath).default as Function
    registerModel()
})
