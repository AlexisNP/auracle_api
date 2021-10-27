import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { AuracleApiModel } from "../../../common/classes/AuracleApiModel"
import { User } from "../users/User"
import { Ingredient } from "./Ingredient"
import { School } from "./School"
import { Variable } from "./Variable"

@Entity()
export class Spell extends AuracleApiModel {
    @PrimaryGeneratedColumn('uuid')
    public readonly uuid!: string

    @Column({
        unique: true
    })
    public name: string

    @Column({
        unique: true
    })
    public description: string

    @Column()
    public level?: number
    @Column()
    public charge?: number
    @Column()
    public cost?: string
    @Column()
    public isRitual?: boolean

    @Column()
    public published?: boolean
    @Column()
    public public?: boolean

    // LINKED ENTITIES
    @ManyToMany(() => School, school => school.spells)
    public schools?: School[]

    @ManyToMany(() => Variable, variable => variable.spells)
    public variables?: Variable[]

    @ManyToMany(() => Ingredient, ingredient => ingredient.spells)
    public ingredients?: Ingredient[]

    @ManyToOne(() => User, user => user.spells)
    public creator: User

    // TIMESTAMPS
    @Column()
    @CreateDateColumn()
    public createdAt?: Date

    @Column()
    @UpdateDateColumn()
    public updatedAt?: Date
}
