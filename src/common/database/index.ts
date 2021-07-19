import { Model, ModelOptions, Options, Sequelize } from 'sequelize'
import registerModels from './models'

const tablePrefix = 'au_'

/**
 * Registers the options to create the sequelize instance
 */
const driverOptions: Options = {
    /**
     * Access to database
     */
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    logging: false,

    /**
     * Sequelize Hooks
     * Docs : https://sequelize.org/master/manual/hooks.html
     */
    hooks: {
        beforeDefine: (model: ModelOptions<Model<any, any>>) => {
            model.tableName = tablePrefix + model.name.plural
        }
    }
}
// Creates the sequelize instance
export const AuracleDatabaseDriver = new Sequelize(driverOptions)

/**
 * If the environement is production...
 */
if (process.env.NODE_ENV != 'production') {
    AuracleDatabaseDriver.sync({
        force: true
    })
}

/**
 * Registers models presents in the /models folder
 */
registerModels()
