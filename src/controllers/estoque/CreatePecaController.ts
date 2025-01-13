import { Request, Response } from 'express';
import { CreatePecaService } from '../../services/estoque/CreatePecaService';

class CreatePecaController {
  constructor(private createPecaService: CreatePecaService) {}

  async handle(req: Request, res: Response) {
    try {
      const input = req.body; // Espera { nome, obs }
      const result = await this.createPecaService.execute(input);

      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      return res.json(result);
    } catch (error) {
      console.error('Error in CreatePecaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CreatePecaController };
