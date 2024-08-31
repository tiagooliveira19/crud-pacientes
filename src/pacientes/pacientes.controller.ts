import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    HttpStatus
} from '@nestjs/common';
import { PacientesService } from "./pacientes.service";
import { PacientesDTO } from './pacientes.dto';

@Controller('pacientes')
export class PacientesController {
    constructor(private pacientesService: PacientesService) {}

    @Get()
    async showAllPacientes() {
        const pacientes =  await this.pacientesService.showAll();
        return {
            statusCode: HttpStatus.OK,
            message: 'Pacientes encontrados com sucesso!',
            pacientes
        };
    }

    @Post()
    async createPacientes(@Body() data: PacientesDTO) {
        const paciente = await this.pacientesService.create(data);
        return {
            statusCode: HttpStatus.OK,
            message: 'Paciente criado com sucesso!',
            paciente
        };
    }

    @Get(':id')
    async readPaciente(@Param('id') id: number) {
        const data =  await this.pacientesService.read(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Paciente encontrado com sucesso!',
            data,
        };
    }

    @Patch(':id')
    async uppdatePaciente(@Param('id') id: number, @Body() data: Partial<PacientesDTO>) {
        await this.pacientesService.update(id, data);
        return {
            statusCode: HttpStatus.OK,
            message: 'Paciente atualizado com sucesso!',
        };
    }

    @Delete(':id')
    async deletePaciente(@Param('id') id: number) {
        await this.pacientesService.destroy(id);
        return {
            statusCode: HttpStatus.OK,
            message: 'Paciente excluído com sucesso!',
        };
    }
}
