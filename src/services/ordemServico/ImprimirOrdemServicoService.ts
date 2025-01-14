import prismaClient from '../../prisma';
import PDFDocument from 'pdfkit';

async function gerarPdf(ordemServico: any): Promise<Buffer> {
  return new Promise<Buffer>((resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 50 });

      const buffers: Buffer[] = [];
      doc.on('data', (chunk) => buffers.push(chunk));
      doc.on('end', () => resolve(Buffer.concat(buffers)));
      doc.on('error', (err) => reject(err));

      // Cabeçalho simples
      doc.fontSize(18).text(`ORDEM DE SERVIÇO - ID: ${ordemServico.id}`, { align: 'center' });
      doc.moveDown();

      doc.fontSize(12).text(`Número: ${ordemServico.numero}`);
      doc.text(`Cliente: ${ordemServico.cliente?.nome ?? '---'}`);
      doc.text(`Placa: ${ordemServico.placa}`);
      doc.text(`Responsável: ${ordemServico.responsavel?.nome ?? '---'}`);
      doc.text(`Data Início: ${ordemServico.dataInicio}`);
      doc.text(`Prazo: ${ordemServico.prazo ?? '---'}`);
      doc.moveDown();

      // Listar serviços
      if (ordemServico.servicos?.length) {
        doc.fontSize(14).text('Serviços:', { underline: true });
        doc.moveDown(0.5);
        ordemServico.servicos.forEach((servico: any, i: number) => {
          doc
            .fontSize(12)
            .text(`${i + 1}. ${servico.nomeServico} (Prioridade: ${servico.prioridade})`);
        });
      }

      doc.end();
    } catch (err) {
      reject(err);
    }
  });
}

class ImprimirOrdemServicoService {
  async execute(ordemServicoId: string) {
    if (!ordemServicoId) {
      return { error: 'O ID da ordem de serviço é obrigatório.' };
    }

    try {
      const ordemServico = await prismaClient.ordemServico.findUnique({
        where: { id: ordemServicoId },
        include: {
          cliente: true,
          responsavel: true,
          servicos: {
            include: {
              observacoes: true,
            },
          },
          observacoes: true,
          arquivos: true,
        },
      });

      if (!ordemServico) {
        return { error: 'Ordem de serviço não encontrada.' };
      }

      const pdfBuffer = await gerarPdf(ordemServico);

      // Retorna o Buffer do PDF
      return { pdfBuffer };
    } catch (error) {
      console.error('Erro ao imprimir ordem de serviço:', error);
      return { error: 'Falha ao imprimir ordem de serviço' };
    }
  }
}

export { ImprimirOrdemServicoService };
