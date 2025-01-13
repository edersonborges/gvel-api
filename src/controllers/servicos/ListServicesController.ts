import { Request, Response } from 'express';
import { ListServicesService } from '../../services/servicos/ListServicesService';

class ListServicesController {
  constructor(private listServicesService: ListServicesService) {}

  async handle(req: Request, res: Response) {
    try {
      const result = await this.listServicesService.execute();

      if (result.error) {
        return res.status(400).json({ error: result.error });
      }

      return res.json(result);
    } catch (error) {
      console.error('Error in ListServicesController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListServicesController };
