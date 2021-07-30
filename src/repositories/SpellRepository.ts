import { AuracleApiRepository } from "../common/classes/AuracleApiRepository"
import { Spell, SpellCreationAttributes } from "../database/models/spells/Spell"

export class SpellRepository extends AuracleApiRepository {
    constructor() {
        super(new Spell)
    }

    public async fetchAll(): Promise<Spell[]> {
        return Spell.findAll()
    }

    public async fetchOne(uuid: string): Promise<Spell> {
        return Spell.findByPk(uuid)
    }

    public async createOne(spell: SpellCreationAttributes): Promise<Spell> {
        return Spell.create(spell)
    }
}
