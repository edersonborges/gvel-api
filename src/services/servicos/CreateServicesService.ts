// src/services/servicos/CreateServicesService.ts
import prismaClient from '../../prisma';

interface ServiceInput {
  servico: string;
  ativo?: boolean;
  prioridade: number;
}

interface CreateServicesInput {
  services: ServiceInput[];
}

class CreateServicesService {
  async execute(input: CreateServicesInput) {
    const { services } = input;
    try {
      // Deletar todos os serviços existentes antes de criar novos
      await prismaClient.servico.deleteMany({});

      const createdServices = [];

      for (const serviceData of services) {
        const { servico, ativo = false, prioridade } = serviceData;

        const newService = await prismaClient.servico.create({
          data: {
            servico,
            ordem: prioridade,
          },
        });

        createdServices.push(newService);
      }

      return { message: 'Serviços criados com sucesso', services: createdServices };
    } catch (error) {
      console.error('Erro ao criar serviços:', error);
      return { error: 'Falha ao criar serviços' };
    }
  }
}

export { CreateServicesService };
