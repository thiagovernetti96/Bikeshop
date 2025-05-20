import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";


@Entity()
export class Vendedor {
    @PrimaryGeneratedColumn()
    id?: number
    @Column()
    nome?: string
    @Column()
    email?: string
}