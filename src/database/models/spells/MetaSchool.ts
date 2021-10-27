import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"
import { AuracleApiModel } from "../../../common/classes/AuracleApiModel"
import { User } from "../users/User"
import { School } from "./School"

@Entity()
export class MetaSchool extends AuracleApiModel {
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

    @OneToMany(() => School, school => school.metaSchool)
    public schools?: School[]

    @ManyToOne(() => User, user => user.metaSchools)
    public creator: User

    // TIMESTAMPS
    @Column()
    @CreateDateColumn()
    public createdAt?: Date

    @Column()
    @UpdateDateColumn()
    public updatedAt?: Date
}
