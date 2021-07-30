import { DataTypes, Model, Optional } from "sequelize";

import { AuracleDatabaseDriver } from "../../AuracleDatabaseDriver";

interface SchoolAttributes {
    uuid: string
    name: string
    description: string

    published: boolean
}

interface SchoolCreationAttributes extends Optional<SchoolAttributes, 'uuid'> { }

export class School extends Model<SchoolAttributes, SchoolCreationAttributes> implements SchoolAttributes {
    public readonly uuid!: string
    public name!: string
    public description!: string

    public published: boolean

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default () => {
    School.init(
        {
            uuid: {
                type: DataTypes.UUID,
                unique: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
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

            published: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            tableName: 'au_schools',
            sequelize: AuracleDatabaseDriver,
        }
    )
}
