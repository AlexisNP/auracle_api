import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Spell {
    @PrimaryGeneratedColumn('uuid')
    public readonly uuid!: string

    @Column()
    public name!: string

    @Column()
    public description!: string
    @Column()
    public level?: number

    @Column()
    public charge?: number
    @Column()
    public cost?: string
    @Column()
    public isRitual?: boolean

    @Column()
    public published?: boolean
    @Column()
    public public?: boolean
}
