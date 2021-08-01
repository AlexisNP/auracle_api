import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Permission } from "./Permission";
import { User } from "./User";

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    public readonly uuid!: string

    @Column()
    public name!: string
    @Column()
    public description!: string

    @OneToMany(() => Permission, permission => permission.roles)
    public permissions: Permission[]

    @OneToMany(() => User, user => user.role)
    public users: User[]

    // TIMESTAMPS
    @Column()
    @CreateDateColumn()
    public createdAt?: Date

    @Column()
    @UpdateDateColumn()
    public updatedAt?: Date
}
