import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDTO {
    @IsNotEmpty({ message: 'O nome é obrigatório.' })
    nome: string;

    @IsEmail({}, { message: 'Email inválido.' })
    email: string;

    @IsNotEmpty({ message: 'A senha é obrigatória.' })
    @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres.' })
    senha: string;

    @IsNotEmpty({ message: 'O telefone é obrigatório.' })
    telefone: string;

    @IsNotEmpty({ message: 'O CPF é obrigatório.' })
    cpf: string;

    constructor(data: Partial<CreateUserDTO>) {
        Object.assign(this, data);
    }
}
