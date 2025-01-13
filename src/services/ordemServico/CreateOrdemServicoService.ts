import prismaClient from '../../prisma';

interface CreateOrdemServicoInput {
  clienteId: string;
  placa: string;
  tipoVeiculo: string;
  subtipoVeiculo: string;
  // Outros campos conforme necessidade
}

class CreateOrdemServicoService {
  async execute(input: CreateOrdemServicoInput) {
    try {
      const ordemServico = await prismaClient.ordemServico.create({
        data: {
          clienteId: input.clienteId,
          placa: input.placa,
          tipoVeiculo: input.tipoVeiculo,
          subtipoVeiculo: input.subtipoVeiculo,
          // O campo "numero" será gerado automaticamente
        }
      });
      return { message: 'Ordem de serviço criada com sucesso', ordemServico };
    } catch (error) {
      console.error('Erro ao criar ordem de serviço:', error);
      return { error: 'Falha ao criar ordem de serviço' };
    }
  }
}

export { CreateOrdemServicoService };
