import { Request, Response } from 'express';
import { CreateOrdemServicoService } from '../../services/ordemServico/CreateOrdemServicoService';

class CreateOrdemServicoController {
  constructor(private createOrdemServicoService: CreateOrdemServicoService) {}

  async handle(req: Request, res: Response) {
    try {
      const result = await this.createOrdemServicoService.execute(req.body);

      if ('error' in result) {
        return res.status(400).json({ error: result.error });
      }

      return res.status(201).json(result);
    } catch (error) {
      console.error('Erro no CreateOrdemServicoController:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export { CreateOrdemServicoController };
