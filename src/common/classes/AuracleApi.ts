import express, { Application } from 'express'
import { Connection } from 'typeorm'
import { VSColors } from '../enums/VSColors'
import { AuracleApiRouter } from './AuracleApiRouter'

/**
 * AuracleApi is the main class handling all the routing, modules and middlewares.
 * The 
 * Once the constructor is called, it automatically listens on the given port.
 */
export class AuracleApi {
    /**
     * Express core App.
     */
    public app: Application

    /**
     * The port where the Express app is running on.
     * @default 3000
     */
    public port = 3000

    /**
     * Current version of the API.
     *
     * The usual format follows after `v1`
     */
    public version = 'v1'

    /**
     * Base URI to access the various endpoints of the Express App.
     *
     * The usual format follows
     * ```javascript
     * /api/${this.version}/
     * ```
     */
    public baseUri = `/api/${this.version}/`

    constructor(
        init: {
            database: Promise<Connection>
            port?: any
            routers?: Array<AuracleApiRouter>
            modules?: Array<any>
            middlewares?: Array<any>
        }
    ) {
        this.app = express()

        if (init.port) {
            this.port = Number(init.port)
        }

        console.log(VSColors.cyan, `[INFO] Running in a ${process.env.NODE_ENV} environment.`)

        // Making sure the DB is up before init routers, modules, etc...
        if (init.database) {
            this.connectDatabase(init.database)
                .then(async () => {

                    // Loads other services
                    await this.registerServices(init.routers, init.modules, init.middlewares)

                    this.listen()
                })
                .catch((err) => {
                    console.error(VSColors.red, "[ERROR] App couldn't boot up with the following errors : ")
                    console.error(VSColors.red, err)
                })
        }
    }

    /**
     * Links the API with a TypeORM connection
     */
    private async connectDatabase(db_driver: Promise<Connection>) {
        try {
            // Tries to connect...
            console.info(VSColors.yellow, '[TASK] Trying to connect to the database...')
            const connection = await db_driver
            console.info(VSColors.green, '[SUCCESS] Connection has been established successfully.')

            // Should the DB be rebuilt ? Are we in production ?
            const dropDatabase = (process.env.NODE_ENV === 'prod') ? false : true

            // Then builds the data schema from registered entities...
            console.info(VSColors.yellow, '[TASK] Syncing database and its schemas...')
            await connection.synchronize(dropDatabase)
            console.info(VSColors.green, '[SUCCESS] Syncing done.')


            return connection
        } catch (err) {
            console.error(VSColors.red, '[ERROR] Unable to connect to the database !')
            throw err
        }
    }

    /**
     * Registers other express services to add onto the core app
     *
     * @param routers A list of Express Routers extended from AuracleApiRouter
     * @param modules A list of Express extensions
     * @param middlewares A list of Express middlewares that handle other functions
     */
    private async registerServices(routers: Array<AuracleApiRouter>, modules: Array<any>, middlewares: Array<any>) {
        return Promise.all([
            this.modules(modules),
            this.routers(routers),
            this.middlewares(middlewares)
        ])
            .catch((err) => {
                throw err
            })
    }

    /**
     * Initializes the App with a bunch of modules like helmet, cors, morgan...
     * @param modules An array of modules and extensions
     */
    private async modules(modules: Array<any>) {
        try {
            modules.forEach(module => this.app.use(module))
        } catch (err) {
            console.error(VSColors.red, '[ERROR] Unable to initialize modules and extensions.')
            throw err
        }
    }

    /**
     * Initializes routers
     * @param routers An array of AuracleApiRouter children objects
     */
    private async routers(routers: Array<AuracleApiRouter>) {
        try {
            routers.forEach(router => this.app.use(`${this.baseUri}`, router.instance))
        } catch (err) {
            console.error(VSColors.red, '[ERROR] Unable to initialize routers.')
            throw err
        }
    }

    private async middlewares(middleWares: {
        forEach: (arg0: (middleWare: any) => void) => void;
    }) {
        try {
            middleWares.forEach(middleWare => this.app.use(middleWare))
        } catch (err) {
            console.error(VSColors.red, '[ERROR] Unable to initialize middlewares.')
            throw err
        }
    }

    /**
     * Allows the App to run on its given port
     */
    public listen() {
        this.app.listen(this.port, () => console.info(VSColors.green, `\n[APP] App listening on http://localhost${this.baseUri}.`))
    }
}
