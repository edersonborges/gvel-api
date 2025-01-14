import { validate } from 'class-validator';
import { hash } from 'bcryptjs';
import prismaClient from '../../prisma';
import { CreateUserDTO } from '../../DTO/CreateUserDTO';

interface CreateUserInput {
    nome: string;
    senha: string;
    email: string;
    telefone: string;
    cpf: string;
}

class CreateUserService {
    async execute(createUserInput: CreateUserInput) {
        try {
            // Validação dos dados
            const createUserDTO = new CreateUserDTO(createUserInput);
            const errors = await validate(createUserDTO);

            if (errors.length > 0) {
                const errorMessage = errors
                    .map(error => error.constraints ? Object.values(error.constraints).join(', ') : '')
                    .filter(msg => msg)
                    .join('. ');
                return errorMessage;
            }

            const { nome, email, senha, telefone, cpf } = createUserInput;

            // Verificando se existe um convite válido para o email fornecido
            const convite = await prismaClient.convite.findFirst({
                where: {
                    email: email,
                    utilizado: false,  // Convite ainda não utilizado
                }
            }); 
            console.log(convite);

            if (!convite) {
                return 'Email não possui um convite válido ou já foi utilizado.';
            }

            // Verificando se o telefone já existe
            const existingUserByTelefone = await prismaClient.usuario.findFirst({ where: { telefone } });
            if (existingUserByTelefone) {
                return 'O telefone informado já está em uso por outro usuário.';
            }

            // Verificando se o email já existe na tabela de usuários
            const existingUserByEmail = await prismaClient.usuario.findFirst({ where: { email } });
            if (existingUserByEmail) {
                return 'O email informado já está em uso por outro usuário.';
            }

            // Verificando se o cpf já existe
            const existingUserByCpf = await prismaClient.usuario.findFirst({ where: { cpf } });
            if (existingUserByCpf) {
                return 'O CPF informado já está em uso por outro usuário.';
            }

            // Hash da senha
            const hashedPassword = await hash(senha, 10);

            // Criando usuário
            const user = await prismaClient.usuario.create({
                data: {
                    nome,
                    email,
                    senha: hashedPassword,
                    telefone,
                    cpf,
                },
            });

            // Após criar o usuário, marcar o convite como utilizado
            await prismaClient.convite.update({
                where: { id: convite.id },
                data: { utilizado: true }
            });

            return { message: user };
        } catch (error) {
            console.error('Falha ao criar usuário:', error);
            return 'Falha ao criar usuário';
        }
    }
}

export { CreateUserService };
