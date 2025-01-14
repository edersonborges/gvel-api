import prismaClient from '../../prisma';

interface ServicoInput {
  nome: string;        // Nome do serviço
  prioridade: number;  // Prioridade do serviço
}

interface ImagemInput {
  img_key: string;     // Chave da imagem (ex: no S3 ou local)
}

interface CreateOrdemServicoInput {
  clienteId: string;
  placa: string;
  tipoVeiculo: string;
  subtipoVeiculo: string;
  prazo?: Date;           // prazo é opcional
  servicos: ServicoInput[]; // lista de serviços
  imagens?: ImagemInput[];  // lista de imagens associadas
}

class CreateOrdemServicoService {
  async execute(input: CreateOrdemServicoInput) {
    const {
      clienteId,
      placa,
      tipoVeiculo,
      subtipoVeiculo,
      prazo,
      servicos,
      imagens,
    } = input;

    try {
      return await prismaClient.$transaction(async (tx) => {
        // 1) Criar a Ordem de Serviço
        const ordemServico = await tx.ordemServico.create({
          data: {
            clienteId,
            placa,
            tipoVeiculo,
            subtipoVeiculo,
            prazo,
            // Criação dos itens de serviço (OrdemServicoItem)
            servicos: {
              create: servicos.map((servico) => ({
                nomeServico: servico.nome,
                prioridade: servico.prioridade,
              })),
            },
          },
          include: {
            servicos: true, // para termos o array de itens após criar
          },
        });

        // 2) Identificar o serviço de maior prioridade
        //    (aqui, se prioridade for "quanto MENOR o número, mais prioritário",
        //    então a comparação está correta. Se for o contrário, ajuste a lógica.)
        const servicoMaisPrioritario = ordemServico.servicos.reduce(
          (anterior, atual) =>
            anterior.prioridade < atual.prioridade ? anterior : atual
        );

        // 3) Marcar dataInicio do serviço mais prioritário como agora
        await tx.ordemServicoItem.update({
          where: {
            id: servicoMaisPrioritario.id,
          },
          data: {
            dataInicio: new Date(),
          },
        });

        // 4) Registrar as imagens na tabela Arquivo, caso existam
        if (imagens && imagens.length > 0) {
          await tx.arquivo.createMany({
            data: imagens.map((img) => ({
              imgKey: img.img_key,
              tipo: 'ordem_servico',
              ordemServicoId: ordemServico.id,
            })),
          });
        }

        return {
          message: 'Ordem de Serviço criada com sucesso',
          ordemServico,
        };
      });
    } catch (error) {
      console.error('Erro ao criar ordem de serviço:', error);
      return { error: 'Falha ao criar ordem de serviço' };
    }
  }
}

export { CreateOrdemServicoService };
