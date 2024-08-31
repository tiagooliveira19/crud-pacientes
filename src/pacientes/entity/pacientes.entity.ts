import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('pacientes')
export class PacientesEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nome: string;

    @Column()
    cpf: string;

    @Column({
        type: 'date'
    })
    data_nascimento: string;

    @Column()
    email: string;

    @Column()
    telefone: string;

    @Column({
        nullable: true
    })
    cep: string;

    @Column({
        nullable: true
    })
    logradouro: string;

    @Column({
        nullable: true
    })
    bairro: string;

    @Column({
        nullable: true
    })
    localidade: string;

    @Column({
        nullable: true
    })
    uf: string;
}