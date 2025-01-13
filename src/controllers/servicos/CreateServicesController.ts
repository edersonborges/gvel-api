// src/controllers/servicos/CreateServicesController.ts
import { Request, Response } from 'express';
import { CreateServicesService } from '../../services/servicos/CreateServicesService';

class CreateServicesController {
  constructor(private createServicesService: CreateServicesService) {}

  async handle(req: Request, res: Response) {
    try {
      const input = req.body; 
      const result = await this.createServicesService.execute(input);

      if (result.error) {
        return res.status(400).json({ error: result.error });
      }

      return res.json(result);
    } catch (error) {
      console.error('Error in CreateServicesController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CreateServicesController };
