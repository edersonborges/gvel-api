import { Request, Response } from 'express';
import { ListUsersService } from '../../services/users/ListUsersService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ListUsersController {
  private listUsersService: ListUsersService;

  constructor(listUsersService: ListUsersService) {
    this.listUsersService = listUsersService;
  }

  async handle(req: Request, res: Response) {
    try {
      const result = await this.listUsersService.execute();

      if (typeof result === 'string') {
        // Se o resultado for uma string, consideramos como erro
        return res.status(400).json({ error: result });
      }

      // Serializa bigints se houver e envia resposta
      const message = serializeBigInt(result.message);
      return res.json({ success: true, message });
    } catch (error) {
      console.error('Erro no ListUsersController:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export { ListUsersController };
