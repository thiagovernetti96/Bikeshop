import { Entity,PrimaryGeneratedColumn,Column, ManyToOne } from "typeorm";
import { Vendedor } from "./vendedor";
import {Cliente} from "./cliente";
import {Bike} from "./bike";


@Entity()
export class Nota{
    @PrimaryGeneratedColumn()
    id?: number
    @ManyToOne(() => Vendedor, { eager: false })
    vendedor?: Vendedor;

    @ManyToOne(() => Cliente, { eager: false })
    cliente?: Cliente;

    @ManyToOne(() => Bike, { eager: false })
    bike?: Bike;
    @Column()
    valor?: number
    @Column()
    data?: Date
}