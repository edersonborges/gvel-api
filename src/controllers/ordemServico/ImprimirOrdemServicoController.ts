// src/controllers/ordemServico/ImprimirOrdemServicoController.ts
import { Request, Response } from 'express';
import { ImprimirOrdemServicoService } from '../../services/ordemServico/ImprimirOrdemServicoService';

class ImprimirOrdemServicoController {
  constructor(private imprimirOrdemServicoService: ImprimirOrdemServicoService) {}

  async handle(req: Request, res: Response) {
    try {
      const { id } = req.params;

      const result = await this.imprimirOrdemServicoService.execute(id);

      if ('error' in result) {
        return res.status(404).json({ error: result.error });
      }

      const { pdfBuffer } = result;
      if (!pdfBuffer) {
        return res.status(400).json({ error: 'Falha ao gerar PDF da ordem de serviço.' });
      }

      // Convertendo PDF em base64
      const pdfBase64 = pdfBuffer.toString('base64');

      /**
       * Montamos um HTML que embute o PDF em <embed> e chama window.print()
       * assim que a página carrega (onload).
       */
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8" />
            <title>Imprimir Ordem de Serviço</title>
            <style>
              html, body {
                margin: 0;
                padding: 0;
                height: 100%;
              }
              embed {
                width: 100%;
                height: 100%;
              }
            </style>
          </head>
          <body onload="window.print()">
            <embed
              src="data:application/pdf;base64,${pdfBase64}"
              type="application/pdf"
            />
          </body>
        </html>
      `;

      // Retornamos esse HTML
      res.setHeader('Content-Type', 'text/html; charset=utf-8');
      return res.send(html);
    } catch (error) {
      console.error('Erro no ImprimirOrdemServicoController:', error);
      return res.status(500).json({ error: 'Erro interno do servidor' });
    }
  }
}

export { ImprimirOrdemServicoController };
