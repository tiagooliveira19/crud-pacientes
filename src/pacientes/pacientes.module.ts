import { Module } from '@nestjs/common';
import { TypeOrmModule } from "@nestjs/typeorm";
import { PacientesController } from './controller/pacientes.controller';
import { PacientesService } from './service/pacientes.service';
import { PacientesEntity } from './entity/pacientes.entity';

@Module({
    imports: [TypeOrmModule.forFeature([PacientesEntity])],
    controllers: [PacientesController],
    providers: [PacientesService],
})
export class PacientesModule {}
