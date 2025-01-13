/*
  Warnings:

  - You are about to drop the column `veiculoId` on the `Arquivo` table. All the data in the column will be lost.
  - You are about to drop the column `veiculoId` on the `OrdemServico` table. All the data in the column will be lost.
  - You are about to drop the `Veiculo` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `placa` to the `OrdemServico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtipoVeiculo` to the `OrdemServico` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tipoVeiculo` to the `OrdemServico` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Arquivo" DROP CONSTRAINT "Arquivo_veiculoId_fkey";

-- DropForeignKey
ALTER TABLE "OrdemServico" DROP CONSTRAINT "OrdemServico_veiculoId_fkey";

-- DropForeignKey
ALTER TABLE "Veiculo" DROP CONSTRAINT "Veiculo_responsavelId_fkey";

-- AlterTable
ALTER TABLE "Arquivo" DROP COLUMN "veiculoId";

-- AlterTable
ALTER TABLE "OrdemServico" DROP COLUMN "veiculoId",
ADD COLUMN     "placa" TEXT NOT NULL,
ADD COLUMN     "subtipoVeiculo" TEXT NOT NULL,
ADD COLUMN     "tipoVeiculo" TEXT NOT NULL;

-- DropTable
DROP TABLE "Veiculo";
