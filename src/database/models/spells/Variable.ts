import { DataTypes, Model, Optional } from "sequelize";

import { AuracleDatabaseDriver } from "../../AuracleDatabaseDriver";

interface VariableAttributes {
    uuid: string
    description: string

    published: boolean
}

interface VariableCreationAttributes extends Optional<VariableAttributes, 'uuid'> { }

export class Variable extends Model<VariableAttributes, VariableCreationAttributes> implements VariableAttributes {
    public readonly uuid!: string
    public description!: string

    public published: boolean

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default () => {
    Variable.init(
        {
            uuid: {
                type: DataTypes.UUID,
                unique: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
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
            tableName: 'au_variables',
            sequelize: AuracleDatabaseDriver,
        }
    )
}
