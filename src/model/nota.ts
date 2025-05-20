import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";


@Entity()
export class Nota{
    @PrimaryGeneratedColumn()
    id?: number
    @Column()
    vendedorId?: number
    @Column()
    clienteId?: number
    @Column()
    bikeId?: number
    @Column()
    valor?: number
    @Column()
    data?: Date
}