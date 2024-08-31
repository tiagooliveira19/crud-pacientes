import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppService } from './app.service';
import { PacientesModule } from './pacientes/pacientes.module';
import dbConfig from 'db/dbConfig';

@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), PacientesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
