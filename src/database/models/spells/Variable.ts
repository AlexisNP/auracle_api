import { DataTypes, Model, Optional } from "sequelize";

import { AuracleDatabaseDriver } from "../../AuracleDatabaseDriver";

interface VariableAttributes {
    id: number
    uuid: string
    description: string

    published: boolean
}

interface VariableCreationAttributes extends Optional<VariableAttributes, 'id'> { }

export class Variable extends Model<VariableAttributes, VariableCreationAttributes> implements VariableAttributes {
    public readonly id!: number
    public readonly uuid!: string
    public description!: string

    public published: boolean

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default () => {
    Variable.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            uuid: {
                type: DataTypes.UUID,
                allowNull: false,
                unique: true,
                defaultValue: DataTypes.UUIDV4
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            published: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            tableName: 'variables',
            sequelize: AuracleDatabaseDriver,
        }
    )
}
