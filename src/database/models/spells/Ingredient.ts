import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../users/User";
import { Spell } from "./Spell";

@Entity()
export class Ingredient {
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
    public published: boolean

    @ManyToMany(() => Spell, spell => spell.ingredients)
    @JoinTable({
        name: 'ingredients_spells'
    })
    public spells?: Spell[]

    @ManyToOne(() => User, user => user.ingredients)
    public creator: User

    // TIMESTAMPS
    @Column()
    @CreateDateColumn()
    public createdAt?: Date

    @Column()
    @UpdateDateColumn()
    public updatedAt?: Date
}
