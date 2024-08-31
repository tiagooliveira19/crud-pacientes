import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PacientesEntity } from './pacientes.entity';
import { PacientesDTO } from './pacientes.dto';

@Injectable()
export class PacientesService {
    constructor(
        @InjectRepository(PacientesEntity)
        private pacientesRepository: Repository<PacientesEntity>,
    ) {}

    async showAll() {
        return await this.pacientesRepository.find();
    }

    async create(data: PacientesDTO) {
        const paciente = this.pacientesRepository.create(data);
        await this.pacientesRepository.save(data);
        return paciente;
    }

    async findByCPF(cpf: string): Promise<PacientesDTO> {
        return await this.pacientesRepository.findOne({
            where: {
                cpf: cpf,
            },
        });
    }

    async read(id: number) {
        return await this.pacientesRepository.findOne({ where: { id: id } });
    }

    async update(id: number, data: Partial<PacientesDTO>) {
        await this.pacientesRepository.update({ id }, data);
        return await this.pacientesRepository.findOne({ where: { id: id } });
    }

    async destroy(id: number) {
        await this.pacientesRepository.delete({ id });
        return { deleted: true };
    }
}
