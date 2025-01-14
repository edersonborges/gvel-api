import prismaClient from '../../prisma';

class PularEtapaService {
  async execute(ordemServicoId: string, acao: string) {
    // Validação dos parâmetros
    if (!ordemServicoId || !acao) {
      return { error: 'Ordem de serviço ID e ação são obrigatórios' };
    }

    try {
      // Busca a OS e inclui a lista de itens (servicos)
      const ordemServico = await prismaClient.ordemServico.findUnique({
        where: { id: ordemServicoId },
        include: { servicos: true },
      });

      if (!ordemServico) {
        return { error: 'Ordem de serviço não encontrada' };
      }

      const itens = ordemServico.servicos;

      if (acao === 'proximo') {
        // 1) Encontrar a "etapa atual", ou seja, a primeira não realizada
        const etapaAtualIndex = itens.findIndex((item) => !item.realizado);

        if (etapaAtualIndex === -1) {
          return { error: 'Nenhuma etapa pendente para avançar' };
        }

        // 2) Marcar a etapa atual como concluída (realizado=true) e setar dataFim
        const etapaAtual = itens[etapaAtualIndex];
        await prismaClient.ordemServicoItem.update({
          where: { id: etapaAtual.id },
          data: {
            realizado: true,
            dataFim: new Date(),
          },
        });

        // 3) Tentar iniciar a próxima etapa (se existir)
        const etapaProxima = itens[etapaAtualIndex + 1];
        if (etapaProxima) {
          await prismaClient.ordemServicoItem.update({
            where: { id: etapaProxima.id },
            data: {
              dataInicio: new Date(),
            },
          });
          return { message: 'Etapa avançada com sucesso' };
        } else {
          return { message: 'Todas as etapas foram concluídas' };
        }

      } else if (acao === 'finalizar') {
        // Finaliza TODOS os itens da OS
        await prismaClient.ordemServicoItem.updateMany({
          where: { ordemServicoId },
          data: {
            realizado: true,
            dataFim: new Date(),
          },
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
