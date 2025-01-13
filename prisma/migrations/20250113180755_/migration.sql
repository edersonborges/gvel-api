/*
  Warnings:

  - You are about to drop the column `fimEtapa` on the `OrdemServicoItem` table. All the data in the column will be lost.
  - You are about to drop the column `inicioEtapa` on the `OrdemServicoItem` table. All the data in the column will be lost.
  - You are about to drop the column `ordemPrioridade` on the `OrdemServicoItem` table. All the data in the column will be lost.
  - You are about to drop the column `ordemServicoId` on the `OrdemServicoItem` table. All the data in the column will be lost.
  - You are about to drop the column `servicoId` on the `OrdemServicoItem` table. All the data in the column will be lost.
  - You are about to drop the column `ativo` on the `Servico` table. All the data in the column will be lost.
  - Added the required column `_ordemServicoId` to the `OrdemServicoItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nomeServico` to the `OrdemServicoItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `prioridade` to the `OrdemServicoItem` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "OrdemServicoItem" DROP CONSTRAINT "OrdemServicoItem_ordemServicoId_fkey";

-- DropForeignKey
ALTER TABLE "OrdemServicoItem" DROP CONSTRAINT "OrdemServicoItem_servicoId_fkey";

-- AlterTable
ALTER TABLE "OrdemServicoItem" DROP COLUMN "fimEtapa",
DROP COLUMN "inicioEtapa",
DROP COLUMN "ordemPrioridade",
DROP COLUMN "ordemServicoId",
DROP COLUMN "servicoId",
ADD COLUMN     "_ordemServicoId" TEXT NOT NULL,
ADD COLUMN     "dataFim" TIMESTAMP(3),
ADD COLUMN     "dataInicio" TIMESTAMP(3),
ADD COLUMN     "nomeServico" TEXT NOT NULL,
ADD COLUMN     "prioridade" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Servico" DROP COLUMN "ativo";

-- AddForeignKey
ALTER TABLE "OrdemServicoItem" ADD CONSTRAINT "OrdemServicoItem__ordemServicoId_fkey" FOREIGN KEY ("_ordemServicoId") REFERENCES "OrdemServico"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
