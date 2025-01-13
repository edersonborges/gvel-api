import { Request, Response } from 'express';
import { PularEtapaService } from '../../services/ordemServico/PularEtapaService';

class PularEtapaController {
  constructor(private pularEtapaService: PularEtapaService) {}

  async handle(req: Request, res: Response) {
    try {
      const { ordemServicoId, acao } = req.body;

      if (!ordemServicoId || !acao) {
        return res.status(400).json({ error: 'Ordem de serviço ID e ação são obrigatórios' });
      }

      const result = await this.pularEtapaService.execute(ordemServicoId, acao);

      if (result.error) {
        return res.status(400).json({ error: result.error });
      }

      return res.json(result);
    } catch (error) {
      console.error('Erro no PularEtapaController:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export { PularEtapaController };
