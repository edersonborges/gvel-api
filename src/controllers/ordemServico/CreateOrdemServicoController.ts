import { Request, Response } from 'express';
import { CreateOrdemServicoService } from '../../services/ordemServico/CreateOrdemServicoService';

class CreateOrdemServicoController {
  constructor(private createOrdemServicoService: CreateOrdemServicoService) {}

  async handle(req: Request, res: Response) {
    try {
      const input = req.body;
      const result = await this.createOrdemServicoService.execute(input);
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      return res.json(result);
    } catch (error) {
      console.error('Error in CreateOrdemServicoController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { CreateOrdemServicoController };
