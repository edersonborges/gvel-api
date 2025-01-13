import prismaClient from '../../prisma';

class ListarUserDadosService {
    async execute(userId: string) {
        try {
            const user = await prismaClient.usuario.findUnique({
                where: { id: userId },
            });

            if (!user) {
                return { message: 'Usuário não encontrado' };
            }

            return { message: user };
        } catch (error) {
            console.error('Error in ListarUserDadosService:', error);
            return { error: 'Falha ao buscar dados do usuário' };
        }
    }
}

export { ListarUserDadosService };
