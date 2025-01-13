import { Request, Response } from 'express';
import { DeleteClientService } from '../../services/cliente/DeleteClientService';

class DeleteClientController {
  constructor(private deleteClientService: DeleteClientService) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const result = await this.deleteClientService.execute(id);

      if (typeof result === 'string') {
        return res.status(400).json({ error: result });
      }

      return res.json(result);
    } catch (error) {
      console.error('Error in DeleteClientController:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  }
}

export { DeleteClientController };
