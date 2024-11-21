import prisma from '../config/prisma.js';
import AppError from '../utils/AppError.js';

const createEvent = async (req, res, next) => {
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
    res.status(200).json({
      status: 'success',
      message: 'Edit event placeholder.',
    });
  } catch (error) {
    next(error);
  }
};

export { createEvent, editEvent };
