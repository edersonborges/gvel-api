import { Request, Response } from 'express';
import { ChangePswService } from '../../services/users/ChangePswService';

class ChangePswController {
    private changePswService: ChangePswService;

    constructor(changePswService: ChangePswService) {
        this.changePswService = changePswService;
    }

    async handle(req: Request, res: Response) {
        const { id } = req.params;
        const { pswNova, pswConfirm } = req.body;

        try {
            // Passa um objeto com as propriedades esperadas pelo serviço
            const result = await this.changePswService.execute({ id, pswNova, pswConfirm });

            if (typeof result === 'string') {
                return res.status(400).json({ error: result });
            }

            return res.status(200).json(result);
        } catch (error: any) {
            console.error('Error in ChangePswController:', error);
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export { ChangePswController };
