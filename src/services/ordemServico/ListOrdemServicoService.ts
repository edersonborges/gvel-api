import prismaClient from '../../prisma';

interface ListOrdemServicoFilters {
  placa?: string; // Filtrar por placa
  cnpj?: string; // Filtrar por CNPJ do cliente
  numeroOrdem?: number; // Filtrar por número da ordem
}

class ListOrdemServicoService {
  async execute(filters: ListOrdemServicoFilters) {
    const { placa, cnpj, numeroOrdem } = filters;

    try {
      const ordens = await prismaClient.ordemServico.findMany({
        where: {
          ...(placa ? { placa } : {}),
          ...(cnpj ? { cliente: { cnpj } } : {}),
          ...(numeroOrdem ? { numero: numeroOrdem } : {}),
        },
        include: {
          servicos: true, // Inclui os serviços da ordem
        },
        orderBy: { createdAt: 'desc' },
      });

      return { message: 'Ordens listadas com sucesso', ordens };
    } catch (error) {
      console.error('Erro ao listar ordens de serviço:', error);
      return { error: 'Falha ao listar ordens de serviço' };
    }
  }
}

export { ListOrdemServicoService };
