import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { AuracleApiModel } from "../../../common/classes/AuracleApiModel";
import { User } from "../users/User";
import { Spell } from "./Spell";

@Entity()
export class Variable extends AuracleApiModel {
    @PrimaryGeneratedColumn('uuid')
    public readonly uuid!: string

    @Column({
        unique: true
    })
    public description: string

    @Column()
    public published: boolean

    @ManyToMany(() => Spell, spell => spell.variables)
    @JoinTable({
        name: 'variables_spells'
    })
    public spells?: Spell[]

    @ManyToOne(() => User, user => user.variables)
    public creator: User

    // TIMESTAMPS
    @Column()
    @CreateDateColumn()
    public createdAt?: Date

    @Column()
    @UpdateDateColumn()
    public updatedAt?: Date
}
