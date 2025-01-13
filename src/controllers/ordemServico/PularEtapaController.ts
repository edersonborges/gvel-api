import { Request, Response } from 'express';
import { PularEtapaService } from '../../services/ordemServico/PularEtapaService';

class PularEtapaController {
  constructor(private pularEtapaService: PularEtapaService) {}

  async handle(req: Request, res: Response) {
    try {
      const { ordemServicoId, acao } = req.body; 
      // Espera { ordemServicoId: string, acao: 'proximo' | 'finalizado' }
      const result = await this.pularEtapaService.execute({ ordemServicoId, acao });
      if (result.error) {
        return res.status(400).json({ error: result.error });
      }
      return res.json(result);
    } catch (error) {
      console.error('Error in PularEtapaController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { PularEtapaController };
