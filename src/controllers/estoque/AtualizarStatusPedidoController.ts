import { Request, Response } from 'express';
import { AtualizarStatusPedidoService } from '../../services/estoque/AtualizarStatusPedidoService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class AtualizarStatusPedidoController {
  private atualizarStatusPedidoService: AtualizarStatusPedidoService;

  constructor(atualizarStatusPedidoService: AtualizarStatusPedidoService) {
    this.atualizarStatusPedidoService = atualizarStatusPedidoService;
  }

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params; // ID do pedido a ser atualizado
      const { status } = req.body; // Novo status

      if (!id || !status) {
        return res.status(400).json({ error: 'ID do pedido e novo status são obrigatórios.' });
      }

      const result = await this.atualizarStatusPedidoService.execute({
        pedidoId: id,
        novoStatus: status,
      });

      if (typeof result === 'string') {
        // Se result for string, ocorreu um erro
        return res.status(400).json({ error: result });
      }

      const message = serializeBigInt(result.message);
      return res.json({ success: true, message, pedido: result.pedido });
    } catch (error) {
      console.error('Error in AtualizarStatusPedidoController:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export { AtualizarStatusPedidoController };
