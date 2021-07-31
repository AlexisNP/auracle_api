import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role {
    @PrimaryGeneratedColumn('uuid')
    public readonly uuid!: string

    @Column()
    public name!: string
    @Column()
    public description!: string
}
