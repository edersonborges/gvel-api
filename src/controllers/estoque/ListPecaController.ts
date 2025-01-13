import { Request, Response } from 'express';
import { ListPecaService } from '../../services/estoque/ListPecaService';

class ListPecaController {
  constructor(private listPecaService: ListPecaService) {}

  async handle(req: Request, res: Response) {
    try {
      const result = await this.listPecaService.execute();
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      return res.json(result);
    } catch (error) {
      console.error('Error in ListPecaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListPecaController };
