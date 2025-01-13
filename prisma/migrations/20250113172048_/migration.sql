-- AlterTable
ALTER TABLE "OrdemServico" ADD COLUMN     "numero" SERIAL NOT NULL;

-- AlterTable
ALTER TABLE "OrdemServicoItem" ADD COLUMN     "fimEtapa" TIMESTAMP(3),
ADD COLUMN     "inicioEtapa" TIMESTAMP(3);
