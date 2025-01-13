import prismaClient from '../../prisma';

interface UpdateClientInput {
  id: string;
  data: {
    nome?: string;
    email?: string;
    telefone?: string;
    cnpj?: string;
    tipo?: number;
  };
}

class UpdateClientService {
  async execute({ id, data }: UpdateClientInput) {
    try {
      const existingClient = await prismaClient.cliente.findUnique({ where: { id } });
      if (!existingClient) {
        return 'Cliente não encontrado';
      }

      const updatedClient = await prismaClient.cliente.update({
        where: { id },
        data,
      });

      return { message: 'Cliente atualizado com sucesso', client: updatedClient };
    } catch (error) {
      console.error('Error in UpdateClientService:', error);
      return 'Falha ao atualizar cliente.';
    }
  }
}

export { UpdateClientService };
