import { Request, Response } from 'express';
import { UpdateClientService } from '../../services/cliente/UpdateClientService';

class UpdateClientController {
  constructor(private updateClientService: UpdateClientService) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, email, telefone, cnpj, tipo } = req.body;
      const data: any = { nome, email, telefone, cnpj, tipo };

      const result = await this.updateClientService.execute({ id, data });

      if (typeof result === 'string') {
        return res.status(400).json({ error: result });
      }

      return res.json(result);
    } catch (error) {
      console.error('Error in UpdateClientController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { UpdateClientController };
