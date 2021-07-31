import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Variable {
    @PrimaryGeneratedColumn('uuid')
    public readonly uuid!: string

    @Column()
    public description!: string

    @Column()
    public published: boolean
}
