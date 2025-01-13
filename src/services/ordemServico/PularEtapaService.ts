import prismaClient from '../../prisma';

interface PularEtapaInput {
  ordemServicoId: string;
  acao: 'proximo' | 'finalizado';
}

class PularEtapaService {
  async execute(input: PularEtapaInput) {
    const { ordemServicoId, acao } = input;
    try {
      // Obter todos os itens da ordem de serviço ordenados pela prioridade
      const itens = await prismaClient.ordemServicoItem.findMany({
        where: { ordemServicoId },
        orderBy: { ordemPrioridade: 'asc' },
      });

      if (!itens.length) {
        return { error: 'Nenhuma etapa encontrada para esta ordem de serviço' };
      }

      // Lógica simplificada para "pular etapa"
      if (acao === 'proximo') {
        // Encontrar a primeira etapa não realizada
        const etapaAtual = itens.find(item => !item.realizado);
        if (etapaAtual) {
          // Marcar a etapa atual como realizada e registrar tempo de fim
          await prismaClient.ordemServicoItem.update({
            where: { id: etapaAtual.id },
            data: {
              realizado: true,
              fimEtapa: new Date(),
            },
          });
          // Se houver próxima etapa, iniciar ela
          const proximaEtapa = itens.find(item => !item.realizado && item.ordemPrioridade > etapaAtual.ordemPrioridade);
          if (proximaEtapa) {
            await prismaClient.ordemServicoItem.update({
              where: { id: proximaEtapa.id },
              data: {
                inicioEtapa: new Date(),
              },
            });
          }
        }
      } else if (acao === 'finalizado') {
        // Marcar todas as etapas como realizadas e definir fimEtapa se não estiver setado
        for (const item of itens) {
          if (!item.realizado) {
            await prismaClient.ordemServicoItem.update({
              where: { id: item.id },
              data: {
                realizado: true,
                fimEtapa: new Date(),
                inicioEtapa: item.inicioEtapa || new Date(),
              },
            });
          }
        }
      }
      return { message: 'Etapa(s) atualizada(s) com sucesso' };
    } catch (error) {
      console.error('Erro ao pular etapa:', error);
      return { error: 'Falha ao atualizar etapa' };
    }
  }
}

export { PularEtapaService };
