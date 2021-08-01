import { Column, CreateDateColumn, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../users/User";
import { MetaSchool } from "./MetaSchool";
import { Spell } from "./Spell";

@Entity()
export class School {
    @PrimaryGeneratedColumn('uuid')
    public readonly uuid!: string

    @Column()
    public name!: string
    @Column()
    public description!: string

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
