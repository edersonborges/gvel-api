import { Request, Response } from 'express';
import { ListClientService } from '../../services/cliente/ListClientService';

class ListClientController {
  constructor(private listClientService: ListClientService) {}

  async handle(req: Request, res: Response) {
    try {
      const result = await this.listClientService.execute();
      return res.json(result);
    } catch (error) {
      console.error('Error in ListClientController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListClientController };
