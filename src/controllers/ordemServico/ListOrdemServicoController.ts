import { Request, Response } from 'express';
import { ListOrdemServicoService } from '../../services/ordemServico/ListOrdemServicoService';

class ListOrdemServicoController {
  constructor(private listOrdemServicoService: ListOrdemServicoService) {}

  async handle(req: Request, res: Response) {
    try {
      const { numero, placa, cnpj } = req.query;

      const filters = {
        numeroOrdem: numero ? parseInt(numero as string, 10) : undefined,
        placa: placa as string | undefined,
        cnpj: cnpj as string | undefined,
      };

      const result = await this.listOrdemServicoService.execute(filters);

      if (result.error) {
        return res.status(400).json({ error: result.error });
      }

      return res.json(result);
    } catch (error) {
      console.error('Error in ListOrdemServicoController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListOrdemServicoController };
