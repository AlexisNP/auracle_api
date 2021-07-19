import express, { Application } from 'express'
import { Sequelize } from 'sequelize'

// import ControllerBase from './class/controller.base'

export class AuracleApi {
    public app: Application
    public port: number
    public base_url = '/api/v1/'

    private database?: Sequelize;

    constructor(init: {
        port: number
        middlewares: any
        // controllers: Array<ControllerBase>
        modules?: Array<any>
        database?: Sequelize
    }) {
        this.app = express()
        this.port = init.port
        this.database = init.database

        if (init.modules) {
            this.modules(init.modules)
        }

        if (init.middlewares) {
            this.middlewares(init.middlewares)
        }

        // if (init.controllers) {
        //   this.controller(init.controllers)
        // }

        if (init.database) {
            this.db_connect(init.database)
        }
    }

    private modules = (modules: Array<any>) => {
        modules.forEach((module) => {
            this.app.use(module)
        })
    }

    //   private controller = (controllers: Array<ControllerBase>) => {
    //     controllers.forEach((controller) => {
    //       this.app.use(this.base_url + controller.path, controller.router)
    //       console.log(`${controller.name} chargé`)
    //     })
    //   }

    private middlewares = (middleWares: {
        forEach: (arg0: (middleWare: any) => void) => void;
    }) => {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare)
        })
    }

    private db_connect = async (db_driver: Sequelize) => {
        try {
            await db_driver.authenticate();
            console.info('Connection has been established successfully.')
        } catch (err) {
            console.error('Unable to connect to the database')
            console.error(err)
        }
    }

    public listen = () => {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
        })
    }
}
