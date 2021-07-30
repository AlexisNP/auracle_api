import { Model, ModelOptions, Options } from "sequelize/types"

const tablePrefix = 'au_'

/**
 * Registers the options to create the sequelize instance
 */
export const dbConfig: Options = {
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
    hooks: {}
}
