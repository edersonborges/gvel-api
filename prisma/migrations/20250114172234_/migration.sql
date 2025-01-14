-- AlterTable
ALTER TABLE "ObsServico" ADD COLUMN     "ordemServicoItemId" TEXT;

-- CreateTable
CREATE TABLE "ObsOrdemServico" (
    "_id" TEXT NOT NULL,
    "ordemServicoId" TEXT NOT NULL,
    "comentario" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "ObsOrdemServico_pkey" PRIMARY KEY ("_id")
);

-- AddForeignKey
ALTER TABLE "ObsServico" ADD CONSTRAINT "ObsServico_ordemServicoItemId_fkey" FOREIGN KEY ("ordemServicoItemId") REFERENCES "OrdemServicoItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ObsOrdemServico" ADD CONSTRAINT "ObsOrdemServico_ordemServicoId_fkey" FOREIGN KEY ("ordemServicoId") REFERENCES "OrdemServico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
