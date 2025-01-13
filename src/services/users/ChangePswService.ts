import prismaClient from '../../prisma';
import { hash } from 'bcryptjs';
// import { sendEmail } from '../../utils/mailer'; // Descomente se for usar

interface ChangePswInput {
    id: string;
    pswNova: string;
    pswConfirm: string;
}

class ChangePswService {
    async execute({ id, pswNova, pswConfirm }: ChangePswInput) {
        try {
            // Verificar se as senhas coincidem
            if (pswNova !== pswConfirm) {
                return 'As senhas devem corresponder';
            }

            const user = await prismaClient.usuario.findUnique({
                where: { id: id },
            });

            if (!user) {
                return 'Usuário não existe';
            }

            // Criptografar a nova senha
            const hashedPassword = await hash(pswNova, 10);

            // Atualizar a senha no banco de dados
            await prismaClient.usuario.update({
                where: { id: id },
                data: { senha: hashedPassword },
            });

            // Enviar email de notificação (se necessário)
            // const subject = 'Senha alterada com sucesso';
            // await sendEmail(user.email, subject, 'Sua senha foi alterada com sucesso.', 'Sua senha foi alterada com sucesso.');

            return { message: 'Senha alterada com sucesso' };
        } catch (error) {
            console.error('Error in ChangePswService:', error);
            return 'Falha ao alterar senha';
        }
    }
}

export { ChangePswService };
