import {
    Controller,
    Get,
    Post,
    Patch,
    Delete,
    Body,
    Param,
    Query,
    HttpStatus
} from "@nestjs/common";
import { PacientesService } from "../service/pacientes.service";
import { PacientesDTO } from '../dto/pacientes.dto';

@Controller('pacientes')
export class PacientesController {
    constructor(private pacientesService: PacientesService) {}

    @Get()
    async showAllPacientes(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
        const pacientes = await this.pacientesService.showAll(page, limit);
        return {
            statusCode: HttpStatus.OK,
            message: 'Pacientes encontrados com sucesso!',
            pacientes: pacientes,
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

    @Get('cpf/:cpf')
    async readPacienteCPF(@Param('cpf') cpf: string) {
        const data =  await this.pacientesService.findByCPF(cpf);
        return {
            statusCode: HttpStatus.OK,
            message: 'Paciente encontrado com sucesso!',
            data,
        };
    }

    @Get('nome/:nome')
    async readPacienteNome(
      @Param('nome') nome: string,
      @Query('page') page: number = 1,
      @Query('limit') limit: number = 10,
    ) {
        const data = await this.pacientesService.findByName(nome, page, limit);
        return {
            statusCode: HttpStatus.OK,
            message: 'Paciente(s) encontrado(s) com sucesso!',
            pacientes: data,
        };
    }

    @Patch(':id')
    async updatePaciente(@Param('id') id: number, @Body() data: Partial<PacientesDTO>) {
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
