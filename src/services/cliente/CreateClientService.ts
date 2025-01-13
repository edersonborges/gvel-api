import prismaClient from '../../prisma';

interface CreateClientInput {
  nome: string;
  email: string;
  telefone: string;
  cnpj: string;
  tipo?: number;
}

class CreateClientService {
  async execute(input: CreateClientInput) {
    const { nome, email, telefone, cnpj, tipo } = input;

    // Verificar se já existe cliente com o mesmo email
    const existingClient = await prismaClient.cliente.findFirst({ where: { email } });
    if (existingClient) {
      return 'Cliente com este email já existe.';
    }

    const client = await prismaClient.cliente.create({
      data: { nome, email, telefone, cnpj, tipo },
    });

    return { message: client };
  }
}

export { CreateClientService };
