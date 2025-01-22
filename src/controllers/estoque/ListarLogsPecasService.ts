import { Request, Response } from 'express';
import { ListarLogsPecasService } from '../../services/estoque/ListarLogsPecasService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ListarLogsPecasController {
  private listarLogsPecasService: ListarLogsPecasService;

  constructor(listarLogsPecasService: ListarLogsPecasService) {
    this.listarLogsPecasService = listarLogsPecasService;
  }

  async handle(req: Request, res: Response) {
    try {
      const result = await this.listarLogsPecasService.execute();

      if (typeof result === 'string') {
        return res.status(400).json({ error: result });
      }

      const message = serializeBigInt(result.message);
      return res.json({ success: true, message });
    } catch (error) {
      console.error('Error in ListarLogsPecasController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListarLogsPecasController };
