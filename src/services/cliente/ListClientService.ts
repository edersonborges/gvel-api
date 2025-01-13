import prismaClient from '../../prisma';

class ListClientService {
  async execute() {
    const clients = await prismaClient.cliente.findMany({
      where: { deletedAt: null }, // Filtra apenas clientes não deletados
    });
    return { message: clients };
  }
}

export { ListClientService };
