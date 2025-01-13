import prismaClient from '../../prisma';

class ListPecaService {
  async execute() {
    try {
      const pecaItems = await prismaClient.estoque.findMany({
        where: { deletedAt: null },
      });
      return { message: pecaItems };
    } catch (error) {
      console.error('Erro ao listar peças:', error);
      return { error: 'Falha ao listar peças' };
    }
  }
}

export { ListPecaService };
