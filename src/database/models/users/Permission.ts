import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Role } from "./Role";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    public readonly uuid!: string

    @Column({
        unique: true
    })
    public slug: string

    @ManyToOne(() => Role, role => role.permissions)
    public roles: Role[]

    // TIMESTAMPS
    @Column()
    @CreateDateColumn()
    public createdAt?: Date

    @Column()
    @UpdateDateColumn()
    public updatedAt?: Date
}
