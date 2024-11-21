/*
  Warnings:

  - The values [EalyBird] on the enum `TicketType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `ticketlimit` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `paymentStatus` on the `EventBooking` table. All the data in the column will be lost.
  - You are about to drop the column `account_Status` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `location_id` on the `User` table. All the data in the column will be lost.
  - Added the required column `ticket_limit` to the `Event` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_status` to the `EventBooking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `EventOrganizer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `account_status` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TicketType_new" AS ENUM ('VIP', 'General', 'Student', 'EarlyBird');
ALTER TABLE "BookingHistory" ALTER COLUMN "ticket_type" TYPE "TicketType_new" USING ("ticket_type"::text::"TicketType_new");
ALTER TYPE "TicketType" RENAME TO "TicketType_old";
ALTER TYPE "TicketType_new" RENAME TO "TicketType";
DROP TYPE "TicketType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_location_id_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "ticketlimit",
ADD COLUMN     "ticket_limit" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "EventBooking" DROP COLUMN "paymentStatus",
ADD COLUMN     "payment_status" "PaymentStatus" NOT NULL;

-- AlterTable
ALTER TABLE "EventOrganizer" ADD COLUMN     "password" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "account_Status",
DROP COLUMN "location_id",
ADD COLUMN     "account_status" "AccountStatus" NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;
