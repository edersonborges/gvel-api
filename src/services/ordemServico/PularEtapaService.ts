import prismaClient from '../../prisma';

class PularEtapaService {
  async execute(ordemServicoId: string, acao: string) {
    // Validação dos parâmetros
    if (!ordemServicoId || !acao) {
      return { error: 'Ordem de serviço ID e ação são obrigatórios' };
    }

    try {
      const ordemServico = await prismaClient.ordemServico.findUnique({
        where: { id: ordemServicoId },
        include: { servicos: true },
      });

      if (!ordemServico) {
        return { error: 'Ordem de serviço não encontrada' };
      }

      const itens = ordemServico.servicos;

      // Lógica para "pular etapa" ou finalizar ordem
      if (acao === 'proximo') {
        const etapaAtual = itens.find((item) => !item.realizado);
        if (!etapaAtual) {
          return { error: 'Nenhuma etapa pendente para avançar' };
        }

        await prismaClient.ordemServicoItem.update({
          where: { id: etapaAtual.id },
          data: { realizado: true, dataFim: new Date() },
        });

        return { message: 'Etapa avançada com sucesso' };
      } else if (acao === 'finalizar') {
        await prismaClient.ordemServicoItem.updateMany({
          where: { ordemServicoId },
          data: { realizado: true, dataFim: new Date() },
        });

        return { message: 'Ordem de serviço finalizada com sucesso' };
      }

      return { error: 'Ação inválida' };
    } catch (error) {
      console.error('Erro ao pular etapa:', error);
      return { error: 'Erro interno do servidor' };
    }
  }
}

export { PularEtapaService };
