import { Entity,PrimaryGeneratedColumn,Column, ManyToOne } from "typeorm";
import { Vendedor } from "./vendedor";
import {Cliente} from "./cliente";
import {Bike} from "./bike";


@Entity()
export class Nota{
    @PrimaryGeneratedColumn()
    id?: number
    @ManyToOne(()=>Vendedor,(vendedor)=>vendedor.id)
    vendedorId?: number
    @ManyToOne(()=>Cliente,(cliente)=>cliente.id)
    clienteId?: number
    @ManyToOne(()=>Bike,(bike)=>bike.id)
    bikeId?: number
    @Column()
    valor?: number
    @Column()
    data?: Date
}