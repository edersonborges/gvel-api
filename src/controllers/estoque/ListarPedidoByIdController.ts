// src/controllers/pedidos/ListarPedidoByIdController.ts

import { Request, Response } from 'express';
import { ListarPedidoByIdService } from '../../services/estoque/ListarPedidoByIdService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ListarPedidoByIdController {
  private listarPedidoByIdService: ListarPedidoByIdService;

  constructor(listarPedidoByIdService: ListarPedidoByIdService) {
    this.listarPedidoByIdService = listarPedidoByIdService;
  }

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.listarPedidoByIdService.execute(id);

      if (typeof result === 'string') {
        return res.status(400).json({ error: result });
      }

      const message = serializeBigInt(result.message);
      return res.json({ success: true, message });
    } catch (error) {
      console.error('Error in ListarPedidoByIdController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListarPedidoByIdController };
