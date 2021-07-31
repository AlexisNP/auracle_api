import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    public readonly uuid!: string

    @Column()
    public readonly mail!: string
    @Column()
    public readonly password!: string

    @Column()
    public name!: string
    @Column()
    public avatar: string
    @Column()
    public gender: string

    @Column()
    public verified: boolean
}
