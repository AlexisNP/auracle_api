import { AuracleApiRouter } from "../common/classes/AuracleApiRouter";
import { SpellController } from "../controllers/SpellController";

export class SpellRouter extends AuracleApiRouter {
    public controller: SpellController

    constructor() {
        super('/spells', new SpellController)

        this.initRoutes()
    }

    public initRoutes() {
        // GET: /spells
        this.instance.get(this.resource, this.controller.getAll.bind(this.controller))

        // GET: /spells/uuid
        this.instance.get(`${this.resource}/:uuid`, this.controller.getOne.bind(this.controller))

        // POST: /spells
        this.instance.post(this.resource, this.controller.createOne.bind(this.controller))
    }
}
