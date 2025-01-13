import { Request as ExpressRequest } from 'express';
import prismaClient from '../../prisma';
// Removido: import { convertToDateTime } from '../../utils/convertToDateTime';

class UpdateUserService {
  public async execute(req: ExpressRequest) {
    const { id } = req.params;
    // Removido data_nasc da extração do corpo da requisição
    const { nome, telefone, tipoImagem, img_key } = req.body;

    try {
      const data: any = {};

      if (nome) data.nome = nome;
      if (telefone) data.telefone = telefone;
      // Removido: tratamento para data_nasc, pois não existe mais

      // Verificando se o usuário existe
      const existingUser = await prismaClient.usuario.findUnique({ where: { id } });
      if (!existingUser) {
        return { message: 'Usuário não encontrado' };
      }

      // Atualizando o usuário
      const user = await prismaClient.usuario.update({
        where: { id },
        data,
      });

      // Verificando se há uma imagem associada para ser atualizada
      if (img_key) {
        const fileData = {
          usuarioId: id,      // Ajustado para usar o campo correto da relação
          tipo: tipoImagem,
          imgKey: img_key,     // Nome do campo conforme o modelo Arquivo
        };

        await prismaClient.arquivo.create({
          data: fileData,
        });
      }

      return { message: 'Usuário atualizado com sucesso', user };
    } catch (error) {
      console.error('Error in UpdateUserService:', error);
      return { message: 'Falha ao atualizar informações do usuário', error: error.message };
    }
  }
}

export { UpdateUserService };
