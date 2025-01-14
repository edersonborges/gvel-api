import { Request, Response } from 'express';
import { CreateConviteService } from '../../services/users/CreateConviteService';

class CreateConviteController {
  constructor(private createConviteService: CreateConviteService) {}

  async handle(req: Request, res: Response) {
    const permissao = req.user.tipo
    if (permissao != 0){
        return res.status(401).json({ error: "Acesso não autorizado" });
    }
    try {
      const { nome, email, tipo } = req.body;

      if (!nome || !email) {
        return res.status(400).json({ error: 'Nome e email são obrigatórios' });
      }

      const result = await this.createConviteService.execute({ nome, email, tipo });

      if (result.error) {
        return res.status(400).json({ error: result.error });
      }

      return res.status(201).json(result);
    } catch (error) {
      console.error('Erro no CreateConviteController:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export { CreateConviteController };
