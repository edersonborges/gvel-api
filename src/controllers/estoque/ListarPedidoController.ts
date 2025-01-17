// src/controllers/pedidos/ListarPedidoController.ts

import { Request, Response } from 'express';
import { ListarPedidoService } from '../../services/estoque/ListarPedidoService';
import { serializeBigInt } from '../../utils/serializeBigInt';

class ListarPedidoController {
  private listarPedidoService: ListarPedidoService;

  constructor(listarPedidoService: ListarPedidoService) {
    this.listarPedidoService = listarPedidoService;
  }

  async handle(req: Request, res: Response) {
    try {
      const result = await this.listarPedidoService.execute();

      if (typeof result === 'string') {
        return res.status(400).json({ error: result });
      }

      const message = serializeBigInt(result.message);
      return res.json({ success: true, message });
    } catch (error) {
      console.error('Error in ListarPedidoController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { ListarPedidoController };
