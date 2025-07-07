import { DataSource } from 'typeorm';
import { Bike } from './model/bike';
import { Cliente } from './model/cliente';
import { Nota } from './model/nota';
import { Vendedor } from './model/vendedor';
import { Usuario } from './model/usuario';
export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'floripa96',
  database: 'postgres',
  synchronize: true,
  logging:true,
  entities: [Bike,Cliente,Nota,Vendedor,Usuario],
  migrations: [],
  subscribers: [],
  
});

console.log('Conectando ao banco:', AppDataSource.options.database);

