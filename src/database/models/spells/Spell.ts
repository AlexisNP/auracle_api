import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { User } from "../users/User"
import { Ingredient } from "./Ingredient"
import { School } from "./School"
import { Variable } from "./Variable"

@Entity()
export class Spell {
    @PrimaryGeneratedColumn('uuid')
    public readonly uuid!: string

    @Column()
    public name!: string

    @Column()
    public description!: string
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
