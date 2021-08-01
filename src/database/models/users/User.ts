import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { Ingredient } from "../spells/Ingredient"
import { MetaSchool } from "../spells/MetaSchool"
import { School } from "../spells/School"
import { Spell } from "../spells/Spell"
import { Variable } from "../spells/Variable"
import { Role } from "./Role"

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    public readonly uuid!: string

    @Column()
    public readonly mail!: string
    @Column()
    public readonly password!: string

    @Column()
    public name!: string
    @Column()
    public avatar: string
    @Column()
    public gender: string

    @Column()
    public verified: boolean

    // CREATIONS
    @OneToMany(() => Spell, spell => spell.creator)
    public spells?: Spell[]

    @OneToMany(() => School, school => school.creator)
    public schools?: School[]

    @OneToMany(() => Variable, variable => variable.creator)
    public variables?: Variable[]

    @OneToMany(() => Ingredient, ingredients => ingredients.creator)
    public ingredients?: Ingredient[]

    @OneToMany(() => MetaSchool, metaSchools => metaSchools.creator)
    public metaSchools?: Ingredient[]

    // ROLE
    @ManyToOne(() => Role, role => role.users)
    public role: Role

    // TIMESTAMPS
    @Column()
    @CreateDateColumn()
    public createdAt?: Date

    @Column()
    @UpdateDateColumn()
    public updatedAt?: Date
}
