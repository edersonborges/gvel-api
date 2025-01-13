import prismaClient from '../../prisma';

class ListServicesService {
  async execute() {
    try {
      const services = await prismaClient.servico.findMany({
        where: { deletedAt: null }, // Opcional: filtrar serviços não deletados
        orderBy: {
          ordem: 'asc', // Ordena pela prioridade: menor número primeiro
        },
      });

      return { message: services };
    } catch (error) {
      console.error('Erro ao listar serviços:', error);
      return { error: 'Falha ao listar serviços' };
    }
  }
}

export { ListServicesService };
