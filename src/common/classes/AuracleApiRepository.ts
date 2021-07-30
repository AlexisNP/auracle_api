import { Model } from "sequelize/types";

export class AuracleApiRepository {
    public model: Model<any, any>

    constructor(model: Model<any, any>) {
        this.model = model
    }
}
