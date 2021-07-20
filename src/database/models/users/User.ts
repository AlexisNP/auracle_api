import { DataTypes, Model, Optional } from "sequelize";

import { AuracleDatabaseDriver } from "../../AuracleDatabaseDriver";

interface UserAttributes {
    id: number
    mail: string
    password: string

    name: string
    avatar: string
    gender: string
    verified: boolean
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number
    public readonly mail!: string
    public readonly password!: string

    public name!: string
    public avatar: string
    public gender: string
    public verified: boolean

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default () => {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true
            },
            mail: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },

            name: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            avatar: {
                type: DataTypes.STRING,
            },
            gender: {
                type: DataTypes.STRING,
            },
            verified: {
                type: DataTypes.BOOLEAN,
            },
        },
        {
            tableName: 'user',
            sequelize: AuracleDatabaseDriver,
        }
    )
}
