import { Request, Response } from 'express';
import { EntradaPecaService } from '../../services/estoque/EntradaPecaService';

class EntradaPecaController {
  constructor(private entradaPecaService: EntradaPecaService) {}

  async handle(req: Request, res: Response) {
    try {
      const input = req.body;
      const result = await this.entradaPecaService.execute(input);

      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      return res.json(result);
    } catch (error) {
      console.error('Error in EntradaPecaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { EntradaPecaController };
