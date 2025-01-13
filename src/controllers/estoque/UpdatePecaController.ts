import { Request, Response } from 'express';
import { UpdatePecaService } from '../../services/estoque/UpdatePecaService';

class UpdatePecaController {
  constructor(private updatePecaService: UpdatePecaService) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, obs, quantidade } = req.body;

      const result = await this.updatePecaService.execute({ id, nome, obs, quantidade });

      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      return res.json(result);
    } catch (error) {
      console.error('Error in UpdatePecaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { UpdatePecaController };
