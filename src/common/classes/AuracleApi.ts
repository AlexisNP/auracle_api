import express, { Application } from 'express'
import { Sequelize } from 'sequelize'
import { AuracleApiRouter } from './AuracleApiRouter'

export class AuracleApi {
    public app: Application
    public port: number
    public version = 'v1'
    public baseUrl = `/api/${this.version}/`

    constructor(
        init: {
            port: any
            database: Sequelize
            routers?: Array<AuracleApiRouter>
            modules?: Array<any>
            middlewares?: Array<any>
        }
    ) {
        this.app = express()
        this.port = Number(init.port)

        // Making sure the DB is up before init routers, modules, etc...
        if (init.database) {
            this.db_connect(init.database)
                .then(() => {

                    // Sets up tasks to execute...
                    const tasks = [
                        this.modules(init.modules),
                        this.routers(init.routers),
                        this.middlewares(init.middlewares)
                    ]

                    Promise.all(tasks)
                        .catch((err) => {
                            throw err
                        })
                })
                .catch((err) => {
                    console.error("App couldn't boot up with the following errors : ")
                    console.error(err)
                })
        }
    }

    /**
     * Links the API with a Sequelize Database Object
     * @param db_driver A Sequelize instance
     */
    private db_connect = async (db_driver: Sequelize) => {
        try {
            const connection = await db_driver.authenticate();
            console.info('Connection has been established successfully.')

            return connection
        } catch (err) {
            console.error('Unable to connect to the database.')
            throw err
        }
    }

    /**
     * Initializes the App with a bunch of modules like helmet, cors, morgan...
     * @param modules An array of modules and extensions
     */
    private modules = async (modules: Array<any>) => {
        try {
            modules.forEach((module) => {
                this.app.use(module)
            })
        } catch (err) {
            console.error('Unable to initialize modules and extensions.')
            throw err
        }
    }

    /**
     * Initializes routers
     * @param routers An array of AuracleApiRouter children objects
     */
    private routers = async (routers: Array<AuracleApiRouter>) => {
        try {
            routers.forEach((router) => {
                this.app.use(`${this.baseUrl}`, router.instance)
            })
        } catch (err) {
            console.error('Unable to initialize routers.')
            throw err
        }
    }

    private middlewares = async (middleWares: {
        forEach: (arg0: (middleWare: any) => void) => void;
    }) => {
        try {
            middleWares.forEach((middleWare) => {
                this.app.use(middleWare)
            })
        } catch (err) {
            console.error('Unable to initialize middlewares.')
            throw err
        }
    }

    /**
     * Allows the App to run on its given port
     */
    public listen = () => {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
        })
    }
}
