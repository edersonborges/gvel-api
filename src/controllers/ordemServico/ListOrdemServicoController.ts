import { Request, Response } from 'express';
import { ListOrdemServicoService } from '../../services/ordemServico/ListOrdemServicoService';

class ListOrdemServicoController {
  constructor(private listOrdemServicoService: ListOrdemServicoService) {}

  async handle(req: Request, res: Response) {
    try {
      const {
        numero,
        placa,
        cnpj,
        nomeServico,
        clienteId,
        tipoVeiculo,
        responsavelNome,
      } = req.query;

      const filters = {
        numeroOrdem: numero ? Number(numero) : undefined,
        placa: placa ? String(placa) : undefined,
        cnpj: cnpj ? String(cnpj) : undefined,
        nomeServico: nomeServico ? String(nomeServico) : undefined,
        clienteId: clienteId ? String(clienteId) : undefined,
        tipoVeiculo: tipoVeiculo ? String(tipoVeiculo) : undefined,
        responsavelNome: responsavelNome ? String(responsavelNome) : undefined,
      };

      const result = await this.listOrdemServicoService.execute(filters);

      if (result.error) {
        return res.status(400).json({ error: result.error });
      }

      return res.json(result);
    } catch (error) {
      console.error('Erro no controlador de listar ordens de serviço:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export { ListOrdemServicoController };
