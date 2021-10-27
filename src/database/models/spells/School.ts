import { BaseEntity, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, Unique, UpdateDateColumn } from "typeorm";
import { AuracleApiModel } from "../../../common/classes/AuracleApiModel";
import { User } from "../users/User";
import { MetaSchool } from "./MetaSchool";
import { Spell } from "./Spell";

@Entity()
export class School extends AuracleApiModel {
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

    @ManyToMany(() => Spell, spell => spell.schools)
    @JoinTable({
        name: 'schools_spells'
    })
    public spells?: Spell[]

    @ManyToOne(() => MetaSchool, metaSchool => metaSchool.schools)
    public metaSchool: MetaSchool

    @ManyToOne(() => User, user => user.schools)
    public creator: User

    // TIMESTAMPS
    @Column()
    @CreateDateColumn()
    public createdAt?: Date

    @Column()
    @UpdateDateColumn()
    public updatedAt?: Date
}
