import prismaClient from '../../prisma';

interface UpdatePecaInput {
  id: string;
  nome?: string;
  obs?: string;
  quantidade?: number;
}

class UpdatePecaService {
  async execute(input: UpdatePecaInput) {
    const { id, nome, obs, quantidade } = input;
    try {
      const existingItem = await prismaClient.estoque.findUnique({ where: { id } });
      if (!existingItem) {
        return { error: 'Peça não encontrada' };
      }

      const updatedItem = await prismaClient.estoque.update({
        where: { id },
        data: {
          nome: nome ?? existingItem.nome,
          obs: obs ?? existingItem.obs,
          quantidade: quantidade ?? existingItem.quantidade,
        },
      });

      return { message: 'Peça atualizada com sucesso', peca: updatedItem };
    } catch (error) {
      console.error('Erro ao atualizar peça:', error);
      return { error: 'Falha ao atualizar peça' };
    }
  }
}

export { UpdatePecaService };
