import prismaClient from '../../prisma';

class ListarLogsPecasService {
  async execute() {
    try {
      const logs = await prismaClient.logEstoque.findMany({
        include: {
          responsavel: true,
          produto: true,
        },
      });

      if (!logs || logs.length === 0) {
        return 'Nenhum log encontrado';
      }

      return { message: logs };
    } catch (error) {
      console.error('Erro ao listar logs de peças:', error);
      return 'Falha ao listar logs de peças.';
    }
  }
}

export { ListarLogsPecasService };
