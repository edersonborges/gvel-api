import prismaClient from '../../prisma';

interface ServicoInput {
  nome: string; // Nome do serviço
  prioridade: number; // Prioridade do serviço
}

interface CreateOrdemServicoInput {
  clienteId: string;
  placa: string;
  tipoVeiculo: string;
  subtipoVeiculo: string;
  prazo?: Date; // Adicionado prazo como opcional
  servicos: ServicoInput[]; // Lista de serviços associados à ordem
}


class CreateOrdemServicoService {
  async execute(input: CreateOrdemServicoInput) {
    const { clienteId, placa, tipoVeiculo, subtipoVeiculo, prazo, servicos } = input;

    try {
      // Criar a ordem de serviço com os itens associados
      const ordemServico = await prismaClient.ordemServico.create({
        data: {
          clienteId,
          placa,
          tipoVeiculo,
          subtipoVeiculo,
          prazo,
          servicos: {
            create: servicos.map(servico => ({
              nomeServico: servico.nome, // Nome do serviço
              prioridade: servico.prioridade, // Prioridade do serviço
            })),
          },
        },
        include: {
          servicos: true, // Inclui os serviços na resposta
        },
      });

      return { message: 'Ordem de Serviço criada com sucesso', ordemServico };
    } catch (error) {
      console.error('Erro ao criar ordem de serviço:', error);
      return { error: 'Falha ao criar ordem de serviço' };
    }
  }
}

export { CreateOrdemServicoService };
