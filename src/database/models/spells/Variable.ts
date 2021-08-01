import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Variable {
    @PrimaryGeneratedColumn('uuid')
    public readonly uuid!: string

    @Column()
    public description!: string

    @Column()
    public published: boolean

    @Column()
    @CreateDateColumn()
    public createdAt?: Date

    @Column()
    @UpdateDateColumn()
    public updatedAt?: Date
}
