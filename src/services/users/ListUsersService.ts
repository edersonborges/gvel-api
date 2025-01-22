import prismaClient from '../../prisma';

class ListUsersService {
  async execute() {
    try {
      // Busca todos os usuários com os campos desejados e filtra arquivos do tipo 'profile'
      const users = await prismaClient.usuario.findMany({
        select: {
          nome: true,
          email: true,
          tipo: true,
          arquivos: {
            where: {
              tipo: 'perfil'
            },
            select: {
              imgKey: true
            }
          }
        }
      });

      // Mapeia a resposta para retornar um único campo de imagem por usuário, se existir
      const result = users.map(user => ({
        nome: user.nome,
        email: user.email,
        tipo: user.tipo,
        // Se existir uma imagem de perfil, pega a primeira
        imagem: user.arquivos.length > 0 ? user.arquivos[0].imgKey : null
      }));

      return { message: 'Usuários listados com sucesso', users: result };
    } catch (error: any) {
      console.error('Erro ao listar usuários:', error);
      return { error: 'Falha ao listar usuários', details: error.message };
    }
  }
}

export { ListUsersService };
