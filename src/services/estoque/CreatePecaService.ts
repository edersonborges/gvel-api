import prismaClient from '../../prisma';

interface CreatePecaInput {
  nome: string;
  obs: string;
}

class CreatePecaService {
  async execute(input: CreatePecaInput) {
    const { nome, obs } = input;
    try {
      const peca = await prismaClient.estoque.create({
        data: {
          nome,
          obs,
          quantidade: 0,  // Iniciando com quantidade 0
        },
      });
      return { message: 'Peça cadastrada com sucesso', peca };
    } catch (error) {
      console.error('Erro ao cadastrar peça:', error);
      return { error: 'Falha ao cadastrar peça' };
    }
  }
}

export { CreatePecaService };
