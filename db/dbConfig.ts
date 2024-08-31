import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { PacientesEntity } from "../src/pacientes/pacientes.entity";

const dbConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'crud',
    synchronize: true,
    logging: true,
    entities: [PacientesEntity],
};

export default dbConfig;