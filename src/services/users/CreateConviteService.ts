import prismaClient from '../../prisma';
import { sendEmail } from '../../utils/mailer';

interface CreateConviteInput {
  nome: string;
  email: string;
  tipo?: number; // Tipo opcional, com valor padrão de 1
}

class CreateConviteService {
  async execute({ nome, email, tipo = 1 }: CreateConviteInput) {
    try {
      // Verificar se já existe um convite para o mesmo email
      const conviteExistente = await prismaClient.convite.findFirst({
        where: { email },
      });

      if (conviteExistente) {
        return { error: 'Já existe um convite ativo para este email' };
      }

      // Criar o convite
      const convite = await prismaClient.convite.create({
        data: {
          nome,
          email,
          tipo,
        },
      });
      const emailSubject = 'Realize seu cadastro';
      const emailHtml = `<p>url/cadastro</p>`;

      await sendEmail(convite.email, emailSubject, emailHtml);
      return { message: 'Convite criado com sucesso', convite };
    } catch (error) {
      console.error('Erro ao criar convite:', error);
      return { error: 'Erro interno ao criar convite' };
    }
  }
}

export { CreateConviteService };
