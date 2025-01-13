import prismaClient from '../../prisma';

class ListOrdemServicoService {
  async execute(numero?: number) {
    try {
      const filter = numero ? { numero } : {};
      const ordens = await prismaClient.ordemServico.findMany({
        where: { ...filter, deletedAt: null },
        orderBy: { createdAt: 'desc' },
      });
      return { message: ordens };
    } catch (error) {
      console.error('Erro ao listar ordens de serviço:', error);
      return { error: 'Falha ao listar ordens de serviço' };
    }
  }
}

export { ListOrdemServicoService };
