import { DataTypes, Model, Optional } from "sequelize";

import { AuracleDatabaseDriver } from "../../AuracleDatabaseDriver";

interface SchoolAttributes {
    id: number
    uuid: string
    name: string
    description: string

    published: boolean
}

interface SchoolCreationAttributes extends Optional<SchoolAttributes, 'id'> { }

export class School extends Model<SchoolAttributes, SchoolCreationAttributes> implements SchoolAttributes {
    public readonly id!: number
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
            tableName: 'schools',
            sequelize: AuracleDatabaseDriver,
        }
    )
}
