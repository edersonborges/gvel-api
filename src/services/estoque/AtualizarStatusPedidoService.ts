import prismaClient from '../../prisma';

interface AtualizarStatusPedidoInput {
  pedidoId: string;
  novoStatus: string;
}

class AtualizarStatusPedidoService {
  async execute({ pedidoId, novoStatus }: AtualizarStatusPedidoInput) {
    try {
      // Verificar se o pedido existe
      const pedidoExistente = await prismaClient.pedido.findUnique({
        where: { id: pedidoId },
      });

      if (!pedidoExistente) {
        return 'Pedido não encontrado';
      }

      // Atualizar o status do pedido
      const pedidoAtualizado = await prismaClient.pedido.update({
        where: { id: pedidoId },
        data: {
          status: novoStatus,
        },
      });

      return { message: 'Status do pedido atualizado com sucesso', pedido: pedidoAtualizado };
    } catch (error) {
      console.error('Erro ao atualizar status do pedido:', error);
      return 'Falha ao atualizar status do pedido.';
    }
  }
}

export { AtualizarStatusPedidoService };
