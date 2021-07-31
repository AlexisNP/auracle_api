import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
