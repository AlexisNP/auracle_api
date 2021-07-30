import { Router, RouterOptions } from "express";
import { AuracleApiController } from "./AuracleApiController";

export abstract class AuracleApiRouter {
    public instance: Router
    public routerOptions: RouterOptions
    public resource: string
    public controller: AuracleApiController

    constructor(resource: string, controller: AuracleApiController, options?: RouterOptions) {
        this.resource = resource
        this.routerOptions = options
        this.controller = controller

        this.instance = Router(this.routerOptions) as Router
    }
}
