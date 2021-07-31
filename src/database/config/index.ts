import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions"

import { Spell } from "../models/spells/Spell"
import { School } from "../models/spells/School"
import { Variable } from "../models/spells/Variable"
import { Ingredient } from "../models/spells/Ingredient"
import { MetaSchool } from "../models/spells/MetaSchool"
import { User } from "../models/users/User"
import { Permission } from "../models/users/Permission"
import { Role } from "../models/users/Role"

const tablePrefix = 'au_'

/**
 * Registers the options to create the sequelize instance
 */
export const dbConfig: MysqlConnectionOptions = {
    /**
     * Access to database
     */
    type: 'mariadb',
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    logging: false,

    entityPrefix: tablePrefix,
    entities: [
        User,
        Permission,
        Role,

        Spell,
        School,
        MetaSchool,

        Variable,
        Ingredient,
    ]
}
