import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'floripa96',
  database: 'seu_banco',
  synchronize: true, // use com cuidado em produção
  logging: false,
  entities: [],
  migrations: [],
  subscribers: [],
});