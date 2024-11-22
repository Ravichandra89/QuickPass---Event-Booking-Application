import { json } from 'express';
import prisma from '../config/prisma.js';
import AppError from '../utils/AppError.js';

const createEvent = async (req, res, next) => {
  console.log('hey');
  try {
    const { organizerId, eventName, description, eventType, startDate, endDate, locationData, seatInventory } =
      req.body;

    if (
      !organizerId ||
      !eventName ||
      !description ||
      !eventType ||
      !startDate ||
      !endDate ||
      !locationData ||
      !seatInventory
    ) {
      return next(new AppError('All fields are required', 400));
    }

    const organizer = await prisma.eventOrganizer.findUnique({
      where: {
        organizer_id: organizerId, // Use the correct unique field
      },
    });

    if (!organizer || organizer.legal_status != 'Approved') {
      return next(new AppError('Org does not exist', 400));
    }

    const location = await prisma.location.create({
      data: {
        address: locationData.address,
        city: locationData.city,
        state: locationData.state,
        country: locationData.country,
        zip_code: locationData.zipCode,
        timezone: locationData.timezone,
        latitude: locationData.latitude,
        longitude: locationData.longitude,
      },
    });

    const event = await prisma.event.create({
      data: {
        organizer_id: organizerId,
        event_name: eventName,
        description,
        event_type: eventType,
        start_date: new Date(startDate),
        end_date: new Date(endDate),
        status: 'Upcoming',
        location_id: location.location_id,
      },
    });

    const seatData = Object.entries(seatInventory).flatMap(([seatType, { totalSeats, price }]) =>
      Array.from({ length: totalSeats }, (_, index) => ({
        event_id: event.event_id,
        seat_number: `${seatType}-${index + 1}`,
        seat_type: seatType,
        price,
        seat_status: 'available',
      })),
    );

    await prisma.seatsInventory.createMany({
      data: seatData,
    });

    res.status(201).json({
      status: 'success',
      data: {
        event,
        seatInventory,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'failed',
      message: error.message,
    });
  }
};

const editEvent = async (req, res, next) => {
  try {
    const { eventName, description, eventType, startDate, endDate } = req.body;
    const { eventId } = req.params;

    const updatedEvent = await prisma.event.update({
      where: { event_id: eventId },
      data: {
        ...(eventName && { event_name: eventName }),
        ...(description && { description }),
        ...(eventType && { event_type: eventType }),
        ...(startDate && { start_date: new Date(startDate) }),
        ...(endDate && { end_date: new Date(endDate) }),
      },
    });

    res.status(200).json({
      status: 'success',
      data: {
        event: updatedEvent,
      },
    });
  } catch (error) {
    if (error.code === 'P2025') {
      return next(new AppError('Event not found!', 404));
    }
    next(error);
  }
};

/**
 *
 * seatInventory : {
 *    addSeat : 10,
 *    seatData : [ {} , {}]
 * }
 */

const changeSeatInventory = async (req, res, next) => {
  try {
    const { addSeat, decreaseSeat, seatData } = req.body;
    const { eventId } = req.params;

    if (!eventId || (!addSeat && !decreaseSeat)) {
      return next(new AppError('Invalid input. Provide eventId and seat modification details.', 400));
    }

    const seatInventory = {
      VIP: await prisma.seatsInventory.findMany({
        where: { event_id: eventId, seat_status: 'available', seat_type: 'VIP' },
      }),
      General: await prisma.seatsInventory.findMany({
        where: { event_id: eventId, seat_status: 'available', seat_type: 'General' },
      }),
    };

    if (decreaseSeat) {
      // Validate and parse `seatData`
      if (!seatData || !Array.isArray(seatData)) {
        return next(new AppError('Invalid seatData. Provide a valid array of seats.', 400));
      }

      const requestedSeats = {
        VIP: seatData.find((seat) => seat.seatType === 'VIP')?.totalSeat || 0,
        General: seatData.find((seat) => seat.seatType === 'General')?.totalSeat || 0,
      };

      if (requestedSeats.VIP > seatInventory.VIP.length || requestedSeats.General > seatInventory.General.length) {
        return next(new AppError('Not enough seats available to decrease.', 400));
      }

      const seatsToRemove = [
        ...seatInventory.VIP.slice(0, requestedSeats.VIP),
        ...seatInventory.General.slice(0, requestedSeats.General),
      ];

      await prisma.$transaction(
        seatsToRemove.map(({ seat_id }) => prisma.seatsInventory.delete({ where: { seat_id } })),
      );

      return res.status(200).json({ status: 'success', message: 'Seats successfully decreased.' });
    }

    if (addSeat) {
      // Validate `seatData`
      if (!seatData || !Array.isArray(seatData)) {
        return next(new AppError('Invalid seatData. Provide a valid array of seats.', 400));
      }

      const newSeats = seatData.flatMap(({ seatType, totalSeat, price }) =>
        Array.from({ length: totalSeat }, (_, index) => ({
          event_id: eventId,
          seat_number: `${seatType}-${index + 1}`,
          seat_type: seatType,
          price: price,
          seat_status: 'available',
        })),
      );

      await prisma.seatsInventory.createMany({ data: newSeats });

      return res.status(200).json({ status: 'success', message: 'Seats successfully added.' });
    }

    return next(new AppError('No valid action provided.', 400));
  } catch (error) {
    next(error);
  }
};

export { createEvent, editEvent, changeSeatInventory };
