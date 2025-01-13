import { Request, Response } from 'express';
import { SaidaPecaService } from '../../services/estoque/SaidaPecaService';

class SaidaPecaController {
  constructor(private saidaPecaService: SaidaPecaService) {}

  async handle(req: Request, res: Response) {
    try {
      const input = req.body;
      const result = await this.saidaPecaService.execute(input);

      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      return res.json(result);
    } catch (error) {
      console.error('Error in SaidaPecaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { SaidaPecaController };
