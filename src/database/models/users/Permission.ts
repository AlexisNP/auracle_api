import { DataTypes, Model, Optional } from "sequelize";

import { AuracleDatabaseDriver } from "../../AuracleDatabaseDriver";

interface PermissionAttributes {
    uuid: string
    slug: string
}

interface PermissionCreationAttributes extends Optional<PermissionAttributes, 'uuid'> { }

export class Permission extends Model<PermissionAttributes, PermissionCreationAttributes> implements PermissionAttributes {
    public readonly uuid!: string
    public slug!: string

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default () => {
    Permission.init(
        {
            uuid: {
                type: DataTypes.UUID,
                unique: true,
                allowNull: false,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true
            },
            slug: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
        },
        {
            tableName: 'au_permissions',
            sequelize: AuracleDatabaseDriver,
        }
    )
}
