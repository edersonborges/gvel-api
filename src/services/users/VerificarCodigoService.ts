import prismaClient from '../../prisma';

class VerificarCodigoService {
    async execute(email: string, codigo: string) {
        try {
            // Verificar se o código existe, está correto e não foi usado
            const codigoRecuperacao = await prismaClient.recSenhaToken.findFirst({
                where: {
                    email: email,
                    token: codigo,
                    isUsed: false,
                },
            });

            if (!codigoRecuperacao) {
                return { message: 'Código inválido ou já utilizado' };
            }

            // Marcar o código como usado
            await prismaClient.recSenhaToken.update({
                where: { id: codigoRecuperacao.id },
                data: { isUsed: true },
            });

            return { message: 'Código validado com sucesso' };
        } catch (error) {
            console.error('Error in VerificarCodigoService:', error);
            return { message: 'Erro ao validar o código' };
        }
    }
}

export { VerificarCodigoService };
