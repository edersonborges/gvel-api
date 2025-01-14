import prismaClient from '../../prisma';

interface ServicoInput {
  nome: string; // Nome do serviço
  prioridade: number; // Prioridade do serviço
}

interface ImagemInput {
  img_key: string; // Chave da imagem no banco ou serviço de armazenamento
}

interface CreateOrdemServicoInput {
  clienteId: string;
  placa: string;
  tipoVeiculo: string;
  subtipoVeiculo: string;
  prazo?: Date; // Adicionado prazo como opcional
  servicos: ServicoInput[]; // Lista de serviços associados à ordem
  imagens?: ImagemInput[]; // Lista de imagens associadas à ordem
}

class CreateOrdemServicoService {
  async execute(input: CreateOrdemServicoInput) {
    const { clienteId, placa, tipoVeiculo, subtipoVeiculo, prazo, servicos, imagens } = input;

    try {
      return await prismaClient.$transaction(async (tx) => {
        // Criar a ordem de serviço
        const ordemServico = await tx.ordemServico.create({
          data: {
            clienteId,
            placa,
            tipoVeiculo,
            subtipoVeiculo,
            prazo,
            servicos: {
              create: servicos.map(servico => ({
                nomeServico: servico.nome,
                prioridade: servico.prioridade,
              })),
            },
          },
          include: {
            servicos: true,
          },
        });

        // Identificar o serviço de maior prioridade
        const servicoMaisPrioritario = ordemServico.servicos.reduce((anterior, atual) =>
          anterior.prioridade < atual.prioridade ? anterior : atual
        );

        // Atualizar o campo dataInicio do serviço de maior prioridade
        await tx.ordemServicoItem.update({
          where: {
            id: servicoMaisPrioritario.id,
          },
          data: {
            dataInicio: new Date(),
          },
        });

        // Registrar imagens na tabela Arquivos, se fornecidas
        if (imagens && imagens.length > 0) {
          await tx.arquivo.createMany({
            data: imagens.map(imagem => ({
              imgKey: imagem.img_key,
              tipo: 'ordem_servico',
              ordemServicoId: ordemServico.id,
            })),
          });
        }

        return { message: 'Ordem de Serviço criada com sucesso', ordemServico };
      });
    } catch (error) {
      console.error('Erro ao criar ordem de serviço:', error);
      return { error: 'Falha ao criar ordem de serviço' };
    }
  }
}

export { CreateOrdemServicoService };
