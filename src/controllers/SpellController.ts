import express from 'express';
import { getRepository } from 'typeorm';
import { AuracleApiController } from "../common/classes/AuracleApiController";
import { AuracleApiResponse } from '../common/classes/AuracleApiResponse';
import { Spell } from '../database/models/spells/Spell';

export class SpellController extends AuracleApiController {
    constructor() {
        super()
    }

    public async getAll(req: express.Request, res: express.Response) {
        let spells: Spell[]

        try {
            spells = await getRepository(Spell).find()
            res = new AuracleApiResponse(200, spells).send(res)
        } catch (err) {
            res = new AuracleApiResponse(400).send(res)
        }
    }

    public async getOne(req: express.Request, res: express.Response) {
        const uuid = req.params.uuid
        let spell: Spell

        try {
            spell = await getRepository(Spell).findOne(uuid)
            res = new AuracleApiResponse(200, spell).send(res)
        } catch (err) {
            res = new AuracleApiResponse(400).send(res)
        }
    }

    public async createOne(req: express.Request, res: express.Response) {
        const spell = {
            name: req.body.name,
            description: req.body.description,
            level: req.body.level,
            charge: req.body.charge,
            cost: req.body.cost,
            isRitual: req.body.isRitual
        }

        try {
            const newSpell = getRepository(Spell).insert(spell)
            res = new AuracleApiResponse(201, newSpell).send(res)
        } catch (err) {
            console.log(err)
        }
    }
}
