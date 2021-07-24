import { DataTypes, Model, Optional } from "sequelize";

import { AuracleDatabaseDriver } from "../../AuracleDatabaseDriver";

interface PermissionAttributes {
    id: number
    uuid: string
    slug: string
}

interface PermissionCreationAttributes extends Optional<PermissionAttributes, 'id'> { }

export class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> implements PermissionAttributes {
    public readonly id!: number
    public readonly uuid!: string
    public slug!: string

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default () => {
    Permission.init(
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
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
        },
        {
            tableName: 'permission',
            sequelize: AuracleDatabaseDriver,
        }
    )
}
