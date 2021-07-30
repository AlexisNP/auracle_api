import { DataTypes, Model, Optional } from "sequelize";

import { AuracleDatabaseDriver } from "../../AuracleDatabaseDriver";

interface MetaSchoolAttributes {
    uuid: string
    name: string
    description: string

    published: boolean
}

interface MetaSchoolCreationAttributes extends Optional<MetaSchoolAttributes, 'uuid'> { }

export class MetaSchool extends Model<MetaSchoolAttributes, MetaSchoolCreationAttributes> implements MetaSchoolAttributes {
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
            tableName: 'au_meta_schools',
            sequelize: AuracleDatabaseDriver,
        }
    )
}
