/*
  Warnings:

  - You are about to drop the column `endDate` on the `TripReservation` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `TripReservation` table. All the data in the column will be lost.
  - Added the required column `end` to the `TripReservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start` to the `TripReservation` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "TripReservation" DROP COLUMN "endDate",
DROP COLUMN "startDate",
ADD COLUMN     "end" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "start" TIMESTAMP(3) NOT NULL;
