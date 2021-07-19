import { DataTypes, Model, Optional } from "sequelize";

import { AuracleDatabaseDriver } from "../../";

interface IngredientAttributes {
    id: number
    name: string
    description: string

    published: boolean
}

interface IngredientCreationAttributes extends Optional<IngredientAttributes, 'id'> { }

class Ingredient extends Model<IngredientAttributes, IngredientCreationAttributes> implements IngredientAttributes {
    public id!: number
    public name!: string
    public description!: string

    public published: boolean

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

export default () => {
    Ingredient.init(
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
            tableName: 'ingredient',
            sequelize: AuracleDatabaseDriver,
        }
    )
}
