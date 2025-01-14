-- AlterTable
ALTER TABLE "OrdemServico" ADD COLUMN     "responsavelId" TEXT;

-- AddForeignKey
ALTER TABLE "OrdemServico" ADD CONSTRAINT "OrdemServico_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "Usuario"("_id") ON DELETE SET NULL ON UPDATE CASCADE;
