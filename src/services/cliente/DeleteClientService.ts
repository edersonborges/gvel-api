import prismaClient from '../../prisma';

class DeleteClientService {
  async execute(clientId: string) {
    try {
      const now = new Date();
      await prismaClient.cliente.update({
        where: { id: clientId },
        data: { deletedAt: now },
      });
      return { message: 'Cliente deletado com sucesso.' };
    } catch (error) {
      console.error('Error in DeleteClientService:', error);
      return 'Falha ao deletar cliente.';
    }
  }
}

export { DeleteClientService };
