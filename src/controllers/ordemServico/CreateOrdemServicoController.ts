import { Request, Response } from 'express';
import { CreateOrdemServicoService } from '../../services/ordemServico/CreateOrdemServicoService';

class CreateOrdemServicoController {
  constructor(private createOrdemServicoService: CreateOrdemServicoService) {}

  async handle(req: Request, res: Response) {
    try {
      // Recebendo o corpo da requisição
      // (clienteId, placa, tipoVeiculo, subtipoVeiculo, prazo, servicos[], imagens[])
      const data = req.body;

      const result = await this.createOrdemServicoService.execute(data);

      if ('error' in result) {
        // Se o result tiver a propriedade "error", retornamos 400
        return res.status(400).json({ error: result.error });
      }

      // Caso contrário, retornamos 201 e o resultado
      return res.status(201).json(result);
    } catch (error) {
      console.error('Erro no CreateOrdemServicoController:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export { CreateOrdemServicoController };
