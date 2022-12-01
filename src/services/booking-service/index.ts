import { notFoundError } from "@/errors";
import bookingRepository from "@/repositories/booking-repository";
import ticketService from "@/services/tickets-service";

async function getBookingByUserId(userId: number) {
  const ticket = await ticketService.getTicketByUserId(userId);
  const booking = await bookingRepository.findBookingByUserId(userId);

  if(!ticket || !booking) {
    throw notFoundError();
  }

  return booking;
}

const bookingService = {
  getBookingByUserId
};

export default bookingService;
