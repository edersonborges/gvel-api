import prismaClient from '../../prisma';

class ListarPedidoService {
  async execute() {
    try {
      const pedidos = await prismaClient.pedido.findMany({
        select: {
          id: true,
          status: true,
          createdAt: true,
          estoque: { select: { nome: true } },
          cliente: { select: { nome: true } },
          responsavel: { select: { nome: true } },
        },
      });

      if (!pedidos || pedidos.length === 0) {
        return 'Nenhum pedido encontrado';
      }

      const result = pedidos.map(pedido => ({
        id: pedido.id,
        nomeProduto: pedido.estoque?.nome,
        nomeCliente: pedido.cliente?.nome,
        status: pedido.status,
        nomeResponsavel: pedido.responsavel?.nome,
        criadoEm: pedido.createdAt,
      }));

      return { message: result };
    } catch (error) {
      console.error('Erro ao listar pedidos:', error);
      return 'Falha ao listar pedidos.';
    }
  }
}

export { ListarPedidoService };
