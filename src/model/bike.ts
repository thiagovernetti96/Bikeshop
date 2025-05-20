import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Bike {
    @PrimaryGeneratedColumn()
    id?: number
    @Column()
    modelo?: string
    @Column()
    valor?: number
    @Column()
    marca?: string
}