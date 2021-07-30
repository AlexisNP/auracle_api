import { AuracleApiRepository } from "./AuracleApiRepository";

export class AuracleApiController {
    public repository: AuracleApiRepository

    constructor(repository: AuracleApiRepository) {
        this.repository = repository
    }
}
