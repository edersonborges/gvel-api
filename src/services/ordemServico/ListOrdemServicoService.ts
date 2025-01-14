import prismaClient from '../../prisma';

interface ListOrdemServicoFilters {
  numeroOrdem?: number;
  placa?: string;
  cnpj?: string;
  nomeServico?: string;
  clienteId?: string;        // <-- Aqui também
  tipoVeiculo?: string;
  responsavelNome?: string;
}

class ListOrdemServicoService {
  async execute(filters: ListOrdemServicoFilters) {
    const {
      numeroOrdem,
      placa,
      cnpj,
      nomeServico,
      clienteId,   // <-- ao invés de clienteNome
      tipoVeiculo,
      responsavelNome,
    } = filters;

    try {
      const ordens = await prismaClient.ordemServico.findMany({
        where: {
          // Filtra pela placa
          ...(placa
            ? {
                placa: {
                  contains: placa,
                  mode: 'insensitive',
                },
              }
            : {}),

          // Filtra pelo CNPJ do cliente (via relação)
          ...(cnpj
            ? {
                cliente: {
                  cnpj: {
                    contains: cnpj,
                    mode: 'insensitive',
                  },
                },
              }
            : {}),

          // Filtra pelo número da Ordem
          ...(numeroOrdem ? { numero: numeroOrdem } : {}),

          // Filtra pelo nome do serviço (dentro de OrdemServicoItem)
          ...(nomeServico
            ? {
                servicos: {
                  some: {
                    nomeServico: { contains: nomeServico, mode: 'insensitive' },
                  },
                },
              }
            : {}),

          // Filtra pelo ID do cliente
          ...(clienteId ? { clienteId } : {}),

          // Filtra pelo tipo do veículo
          ...(tipoVeiculo
            ? {
                tipoVeiculo: {
                  contains: tipoVeiculo,
                  mode: 'insensitive',
                },
              }
            : {}),

          // Filtra pelo nome do responsável
          ...(responsavelNome
            ? {
                responsavel: {
                  nome: {
                    contains: responsavelNome,
                    mode: 'insensitive',
                  },
                },
              }
            : {}),
        },
        include: {
          cliente: {
            select: {
              id: true,
              nome: true,
              email: true,
              telefone: true,
              cnpj: true,
            },
          },
          responsavel: {
            select: {
              id: true,
              nome: true,
              email: true,
              telefone: true,
            },
          },
          servicos: {
            select: {
              id: true,
              nomeServico: true,
              prioridade: true,
              realizado: true,
              dataInicio: true,
              dataFim: true,
              // Observações do item
              observacoes: {
                select: {
                  id: true,
                  texto: true,
                  createdAt: true,
                },
              },
            },
          },
          observacoes: {
            select: {
              id: true,
              comentario: true,
              createdAt: true,
            },
          },
          arquivos: {
            select: {
              id: true,
              imgKey: true,
              tipo: true,
              createdAt: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      // Ordena os serviços por prioridade ascendente
      const result = ordens.map((ordem) => ({
        id: ordem.id,
        numero: ordem.numero,
        placa: ordem.placa,
        tipoVeiculo: ordem.tipoVeiculo,
        subtipoVeiculo: ordem.subtipoVeiculo,
        prazo: ordem.prazo,
        dataInicio: ordem.dataInicio,
        dataFim: ordem.dataFim,
        cliente: ordem.cliente,
        responsavel: ordem.responsavel,
        servicos: [...ordem.servicos].sort((a, b) => a.prioridade - b.prioridade),
        observacoes: ordem.observacoes,
        arquivos: ordem.arquivos,
        createdAt: ordem.createdAt,
        updatedAt: ordem.updatedAt,
      }));

      return { message: 'Ordens listadas com sucesso', ordens: result };
    } catch (error) {
      console.error('Erro ao listar ordens de serviço:', error);
      return { error: 'Falha ao listar ordens de serviço' };
    }
  }
}

export { ListOrdemServicoService };
