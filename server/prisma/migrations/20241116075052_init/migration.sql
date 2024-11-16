-- CreateEnum
CREATE TYPE "AccountStatus" AS ENUM ('active', 'inactive', 'suspended');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('credit', 'debit', 'paypal', 'cash', 'stripe');

-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('Workshop', 'Conference', 'Seminar', 'Concert', 'Exhibition');

-- CreateEnum
CREATE TYPE "EventStatus" AS ENUM ('Completed', 'Upcoming', 'Cancelled', 'PendingApproval');

-- CreateEnum
CREATE TYPE "PaymentStatus" AS ENUM ('Pending', 'Failed', 'Success');

-- CreateEnum
CREATE TYPE "SeatType" AS ENUM ('VIP', 'General', 'Student');

-- CreateEnum
CREATE TYPE "SeatStatus" AS ENUM ('available', 'booked');

-- CreateEnum
CREATE TYPE "TicketType" AS ENUM ('VIP', 'General', 'Student', 'EalyBird');

-- CreateEnum
CREATE TYPE "LegalStatus" AS ENUM ('Pending', 'Approved', 'Rejected', 'Suspended');

-- CreateEnum
CREATE TYPE "TransactionStatus" AS ENUM ('Completed', 'Failed', 'Pending');

-- CreateTable
CREATE TABLE "User" (
    "user_id" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "account_Status" "AccountStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "location_id" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "PaymentInfo" (
    "payment_info_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "card_token" TEXT NOT NULL,
    "expiry_date" TIMESTAMP(3) NOT NULL,
    "billing_address" TEXT NOT NULL,
    "payment_type" "PaymentType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentInfo_pkey" PRIMARY KEY ("payment_info_id")
);

-- CreateTable
CREATE TABLE "Location" (
    "location_id" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "zip_code" TEXT NOT NULL,
    "timezone" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("location_id")
);

-- CreateTable
CREATE TABLE "Preferences" (
    "preferences_id" TEXT NOT NULL,
    "preference_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "Preferences_pkey" PRIMARY KEY ("preferences_id")
);

-- CreateTable
CREATE TABLE "UserPreferences" (
    "user_preferences_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "preferences_id" TEXT NOT NULL,

    CONSTRAINT "UserPreferences_pkey" PRIMARY KEY ("user_preferences_id")
);

-- CreateTable
CREATE TABLE "Event" (
    "event_id" TEXT NOT NULL,
    "organizer_id" TEXT NOT NULL,
    "event_name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "event_type" "EventType" NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL,
    "end_date" TIMESTAMP(3) NOT NULL,
    "location_id" TEXT NOT NULL,
    "status" "EventStatus" NOT NULL,
    "ticketlimit" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("event_id")
);

-- CreateTable
CREATE TABLE "EventBooking" (
    "event_booking_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "seat_id" TEXT NOT NULL,
    "booking_date" TIMESTAMP(3) NOT NULL,
    "paymentStatus" "PaymentStatus" NOT NULL,
    "amount_paid" DOUBLE PRECISION NOT NULL,
    "cancellation_date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventBooking_pkey" PRIMARY KEY ("event_booking_id")
);

-- CreateTable
CREATE TABLE "SeatsInventory" (
    "seat_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "seat_number" TEXT NOT NULL,
    "seat_type" "SeatType" NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "seat_status" "SeatStatus" NOT NULL,

    CONSTRAINT "SeatsInventory_pkey" PRIMARY KEY ("seat_id")
);

-- CreateTable
CREATE TABLE "BookingHistory" (
    "history_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "event_id" TEXT NOT NULL,
    "booking_date" TIMESTAMP(3) NOT NULL,
    "ticket_type" "TicketType" NOT NULL,
    "payment_status" "PaymentStatus" NOT NULL,
    "ticket_quantity" INTEGER NOT NULL,
    "amount_paid" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BookingHistory_pkey" PRIMARY KEY ("history_id")
);

-- CreateTable
CREATE TABLE "EventOrganizer" (
    "organizer_id" TEXT NOT NULL,
    "organizer_name" TEXT NOT NULL,
    "organizer_email" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "gst_number" TEXT NOT NULL,
    "legal_status" "LegalStatus" NOT NULL,
    "approval_date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventOrganizer_pkey" PRIMARY KEY ("organizer_id")
);

-- CreateTable
CREATE TABLE "PaymentTransaction" (
    "transaction_id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "event_booking_id" TEXT NOT NULL,
    "payment_info_id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "TransactionStatus" NOT NULL,
    "transaction_date" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PaymentTransaction_pkey" PRIMARY KEY ("transaction_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "EventOrganizer_organizer_email_key" ON "EventOrganizer"("organizer_email");

-- CreateIndex
CREATE UNIQUE INDEX "EventOrganizer_gst_number_key" ON "EventOrganizer"("gst_number");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("location_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentInfo" ADD CONSTRAINT "PaymentInfo_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserPreferences" ADD CONSTRAINT "UserPreferences_preferences_id_fkey" FOREIGN KEY ("preferences_id") REFERENCES "Preferences"("preferences_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_location_id_fkey" FOREIGN KEY ("location_id") REFERENCES "Location"("location_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_organizer_id_fkey" FOREIGN KEY ("organizer_id") REFERENCES "EventOrganizer"("organizer_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventBooking" ADD CONSTRAINT "EventBooking_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventBooking" ADD CONSTRAINT "EventBooking_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventBooking" ADD CONSTRAINT "EventBooking_seat_id_fkey" FOREIGN KEY ("seat_id") REFERENCES "SeatsInventory"("seat_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SeatsInventory" ADD CONSTRAINT "SeatsInventory_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingHistory" ADD CONSTRAINT "BookingHistory_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Event"("event_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BookingHistory" ADD CONSTRAINT "BookingHistory_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("user_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_event_booking_id_fkey" FOREIGN KEY ("event_booking_id") REFERENCES "EventBooking"("event_booking_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PaymentTransaction" ADD CONSTRAINT "PaymentTransaction_payment_info_id_fkey" FOREIGN KEY ("payment_info_id") REFERENCES "PaymentInfo"("payment_info_id") ON DELETE RESTRICT ON UPDATE CASCADE;
