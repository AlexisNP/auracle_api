import { DataTypes, Model, Optional } from "sequelize";

import { AuracleDatabaseDriver } from "../../AuracleDatabaseDriver";

interface SpellAttributes {
    id: number
    name: string
    description: string

    level: number
    charge: number
    cost: string
    isRitual: boolean

    published: boolean
    public: boolean
}

interface SpellCreationAttributes extends Optional<SpellAttributes, 'id'> { }

class Spell extends Model<SpellAttributes, SpellCreationAttributes> implements SpellAttributes {
    public id!: number
    public name!: string
    public description!: string

    public level: number
    public charge: number
    public cost: string
    public isRitual: boolean

    public published: boolean
    public public: boolean

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default () => {
    Spell.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            level: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            charge: {
                type: DataTypes.INTEGER,
                defaultValue: 0
            },
            cost: {
                type: DataTypes.STRING,
                defaultValue: '0'
            },
            isRitual: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

            published: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            public: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
        },
        {
            tableName: 'spell',
            sequelize: AuracleDatabaseDriver,
        }
    )
}
