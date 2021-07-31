import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class MetaSchool {
    @PrimaryGeneratedColumn('uuid')
    public readonly uuid!: string

    @Column()
    public name!: string
    @Column()
    public description!: string

    @Column()
    public published: boolean
}
