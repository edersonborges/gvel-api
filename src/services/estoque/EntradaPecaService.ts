import prismaClient from '../../prisma';

interface EntradaPecaInput {
  estoqueId: string;
  acao: string;
  responsavelId: string;
  quantidade: number;
  tipoPagamento?: string;
  observacao?: string;
}

class EntradaPecaService {
  async execute(input: EntradaPecaInput) {
    const { estoqueId, acao, responsavelId, quantidade, tipoPagamento, observacao } = input;
    try {
      // Buscar o item de peça
      const pecaItem = await prismaClient.estoque.findUnique({ where: { id: estoqueId } });
      if (!pecaItem) return { error: 'Peça não encontrada' };

      const novaQuantidade = pecaItem.quantidade + quantidade;

      // Executar operações dentro de uma transação
      await prismaClient.$transaction(async (tx) => {
        // Atualiza a quantidade no estoque
        await tx.estoque.update({
          where: { id: estoqueId },
          data: { quantidade: novaQuantidade },
        });

        // Registra o log de entrada
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
      });

      return { message: 'Entrada registrada com sucesso', novaQuantidade };
    } catch (error) {
      console.error('Erro ao registrar entrada de peças:', error);
      return { error: 'Falha ao registrar entrada de peças' };
    }
  }
}

export { EntradaPecaService };
