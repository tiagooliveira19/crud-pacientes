import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

import { PacientesEntity } from '../entity/pacientes.entity';
import { PacientesDTO } from '../dto/pacientes.dto';

@Injectable()
export class PacientesService {
    constructor(
        @InjectRepository(PacientesEntity)
        private pacientesRepository: Repository<PacientesEntity>,
    ) {}

    async showAll(page: number = 1, limit: number = 10) {
        const [result, total] = await this.pacientesRepository.findAndCount({
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            data: result,
            count: total,
            page,
            totalPages: Math.ceil(total / limit),
        };
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

    async findByName(nome: string, page: number = 1, limit: number = 10): Promise<{ data: PacientesDTO[]; count: number; page: number; totalPages: number; }> {
        const [result, total] = await this.pacientesRepository.findAndCount({
            where: {
                nome: ILike(`%${nome}%`),
            },
            skip: (page - 1) * limit,
            take: limit,
        });

        return {
            data: result,
            count: total,
            page,
            totalPages: Math.ceil(total / limit),
        };
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
