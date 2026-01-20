import Booking from "../models/booking.js";

export const checkTableAvailability = async (restaurantId, tableType, date, time, totalAvailable) => {
  const count = await Booking.countDocuments({
    restaurantId,
    tableType,
    date,
    time
  });

  return count < totalAvailable;
};
