import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Permission {
    @PrimaryGeneratedColumn('uuid')
    public readonly uuid!: string

    @Column()
    public slug!: string
}
