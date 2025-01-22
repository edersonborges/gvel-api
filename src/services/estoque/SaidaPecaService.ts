import prismaClient from '../../prisma';

interface SaidaPecaInput {
  estoqueId: string;
  acao: string;
  placa: string;
  responsavelId: string;
  clienteId: string;
  quantidade: number;
  tipoPagamento?: string;
  observacao?: string;
  status?: string;
}

class SaidaPecaService {
  async execute(input: SaidaPecaInput) {
    const { estoqueId, acao, placa, responsavelId, clienteId, quantidade, tipoPagamento, observacao, status } = input;
    try {
      // Buscar o item de peça
      const pecaItem = await prismaClient.estoque.findUnique({ where: { id: estoqueId } });
      if (!pecaItem) return { error: 'Peça não encontrada' };

      if (pecaItem.quantidade < quantidade) {
        return { error: 'Quantidade insuficiente no estoque' };
      }

      const novaQuantidade = pecaItem.quantidade - quantidade;

      // Executar operações dentro de uma transação
      await prismaClient.$transaction(async (tx) => {
        // Atualiza a quantidade no estoque
        await tx.estoque.update({
          where: { id: estoqueId },
          data: { quantidade: novaQuantidade },
        });

        // Registra o log de saída
        await tx.logEstoque.create({
          data: {
            data: new Date().toISOString(),
            acao,
            observacao,
            tipoPagamento,
            responsavelId,
            produtoId: estoqueId,
          },
        });

        // Cria um pedido para essa saída
        await tx.pedido.create({
          data: {
            estoqueId,
            quantidade,
            placa,
            responsavelId,
            clienteId,
            tipoPagamento,
            observacao,
            status
          },
        });
      });

      return { message: 'Saída registrada com sucesso', novaQuantidade };
    } catch (error) {
      console.error('Erro ao registrar saída de peças:', error);
      return { error: 'Falha ao registrar saída de peças' };
    }
  }
}

export { SaidaPecaService };
