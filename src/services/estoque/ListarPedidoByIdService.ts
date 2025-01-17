import prismaClient from '../../prisma';

class ListarPedidoByIdService {
  async execute(pedidoId: string) {
    try {
      const pedido = await prismaClient.pedido.findUnique({
        where: { id: pedidoId },
        include: {
          cliente: true,
          estoque: true,
          responsavel: true,
        },
      });

      if (!pedido) {
        return 'Pedido não encontrado';
      }

      const result = {
        cliente: pedido.cliente,
        produto: {
          nome: pedido.estoque?.nome,
          quantidade: pedido.estoque?.quantidade,
          responsavelRetirada: pedido.responsavel?.nome,
        },
      };

      return { message: result };
    } catch (error) {
      console.error('Erro ao buscar pedido por ID:', error);
      return 'Falha ao buscar pedido.';
    }
  }
}

export { ListarPedidoByIdService };
