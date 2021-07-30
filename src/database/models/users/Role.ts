import { DataTypes, Model, Optional } from "sequelize";

import { AuracleDatabaseDriver } from "../../AuracleDatabaseDriver";

interface RoleAttributes {
    id: number
    uuid: string
    name: string
    description: string
}

interface RoleCreationAttributes extends Optional<RoleAttributes, 'id'> { }

export class Role extends Model<RoleAttributes, RoleCreationAttributes> implements RoleAttributes {
    public readonly id!: number
    public readonly uuid!: string
    public name!: string
    public description!: string

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default () => {
    Role.init(
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
                unique: true
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
        },
        {
            tableName: 'au_roles',
            sequelize: AuracleDatabaseDriver,
        }
    )
}
