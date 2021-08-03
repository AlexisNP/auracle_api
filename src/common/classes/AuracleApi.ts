import express, { Application } from 'express'
import { Connection } from 'typeorm'
import { VSColors } from '../enums/VSColors'
import { AuracleApiRouter } from './AuracleApiRouter'
export class AuracleApi {
    public app: Application
    public port: number
    public version = 'v1'
    public baseUrl = `/api/${this.version}/`

    constructor(
        init: {
            port: any
            database: Promise<Connection>
            routers?: Array<AuracleApiRouter>
            modules?: Array<any>
            middlewares?: Array<any>
        }
    ) {
        this.app = express()
        this.port = Number(init.port)

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
            const connection = await db_driver
            console.info(VSColors.cyan, '[INFO] Connection has been established successfully.')

            // Should the DB be rebuilt ? Are we in production ?
            const dropDatabase = (process.env.NODE_ENV === 'production') ? true : false

            // Then builds the data schema from registered entities...
            await connection.synchronize(dropDatabase)
            console.info(VSColors.cyan, '[INFO] Database schemas have been generated successfully.')

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
            routers.forEach(router => this.app.use(`${this.baseUrl}`, router.instance))
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
        this.app.listen(this.port, () => console.info(VSColors.green, `App listening on port ${this.port} !`))
    }
}
