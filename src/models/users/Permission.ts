import { DataTypes, Model, Optional } from "sequelize";

import { AuracleDatabaseDriver } from "../../common/classes/AuracleDatabaseDriver";

interface PermissionAttributes {
    id: number
    slug: string
}

interface PermissionCreationAttributes extends Optional<PermissionAttributes, 'id'> { }

class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> implements PermissionAttributes {
    public id!: number
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
