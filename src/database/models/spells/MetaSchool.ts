import { DataTypes, Model, Optional } from "sequelize";

import { AuracleDatabaseDriver } from "../../AuracleDatabaseDriver";

interface MetaSchoolAttributes {
    id: number
    uuid: string
    name: string
    description: string

    published: boolean
}

interface MetaSchoolCreationAttributes extends Optional<MetaSchoolAttributes, 'id'> { }

export class MetaSchool extends Model<MetaSchoolAttributes, MetaSchoolCreationAttributes> implements MetaSchoolAttributes {
    public readonly id!: number
    public readonly uuid!: string
    public name!: string
    public description!: string

    public published: boolean

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default () => {
    MetaSchool.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            uuid: {
                type: DataTypes.UUIDV4,
                allowNull: false,
                unique: true
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
            tableName: 'meta-school',
            sequelize: AuracleDatabaseDriver,
        }
    )
}
