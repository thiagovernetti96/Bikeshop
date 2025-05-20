"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
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
