import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Nota } from "./nota";

@Entity()
export class Cliente {
    @PrimaryGeneratedColumn()
    id?: number;

    @Column()
    nome?: string;

    @Column() 
    email?: string;

    @OneToMany (() => Nota, (nota) => nota.cliente)
    notas?: Nota[];
}
