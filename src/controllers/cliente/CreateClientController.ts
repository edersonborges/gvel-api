import { Request, Response } from 'express';
import { CreateClientService } from '../../services/cliente/CreateClientService';

class CreateClientController {
  constructor(private createClientService: CreateClientService) {}

  async handle(req: Request, res: Response) {
    try {
      const input = req.body;
      const result = await this.createClientService.execute(input);

      if (typeof result === 'string') {
        return res.status(400).json({ error: result });
      }

      return res.json(result);
    } catch (error) {
      console.error('Error in CreateClientController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CreateClientController };
