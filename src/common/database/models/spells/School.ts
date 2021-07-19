import { DataTypes, Model, Optional } from "sequelize";

import { AuracleDatabaseDriver } from "../../";

interface SchoolAttributes {
    id: number
    name: string
    description: string

    published: boolean
}

interface SchoolCreationAttributes extends Optional<SchoolAttributes, 'id'> { }

class School extends Model<SchoolAttributes, SchoolCreationAttributes> implements SchoolAttributes {
    public id!: number
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
            tableName: 'school',
            sequelize: AuracleDatabaseDriver,
        }
    )
}
