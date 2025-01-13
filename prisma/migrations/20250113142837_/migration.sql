/*
  Warnings:

  - You are about to drop the column `placa` on the `LogEstoque` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "LogEstoque" DROP COLUMN "placa",
ALTER COLUMN "observacao" DROP NOT NULL;

-- CreateTable
CREATE TABLE "Pedido" (
    "id" TEXT NOT NULL,
    "estoqueId" TEXT NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "placa" TEXT NOT NULL,
    "responsavelId" TEXT NOT NULL,
    "clienteId" TEXT NOT NULL,
    "tipoPagamento" TEXT,
    "observacao" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Pedido_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_estoqueId_fkey" FOREIGN KEY ("estoqueId") REFERENCES "Estoque"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_responsavelId_fkey" FOREIGN KEY ("responsavelId") REFERENCES "Usuario"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Pedido" ADD CONSTRAINT "Pedido_clienteId_fkey" FOREIGN KEY ("clienteId") REFERENCES "Cliente"("_id") ON DELETE RESTRICT ON UPDATE CASCADE;
