import { conflictError, notFoundError } from "@/errors";
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

async function createBooking(userId: number, roomId: number) {
  const ticket = await ticketService.getTicketByUserId(userId);
  const roomInfo = await bookingRepository.findRoomBookings(roomId);

  if(!ticket || ticket.TicketType.isRemote || !ticket.TicketType.includesHotel || ticket.status !== "PAID") throw conflictError("Invalid ticked");
  if(!roomInfo || roomId < 1) throw notFoundError();
  if(roomInfo.capacity <= roomInfo._count.Booking) throw conflictError("Room exceeded capacity");

  const booking = await bookingRepository.insertBooking(userId, roomId);

  return { bookingId: booking.id };
}

async function updateRoomIdBooking(userId: number, bookingId: number, newRoomId: number) {
  const roomInfo = await bookingRepository.findRoomBookings(newRoomId);
  const reservedBooking = await bookingRepository.findBookingById(bookingId);

  if(!reservedBooking) throw notFoundError();
  if(reservedBooking.userId !== userId) throw conflictError("User is not the owner of the booking");
  if(!roomInfo || newRoomId < 1) throw notFoundError();
  if(roomInfo.capacity <= roomInfo._count.Booking) throw conflictError("Room exceeded capacity");

  const booking = await bookingRepository.updateBooking(bookingId, newRoomId);

  return { bookingId: booking.id };
}

const bookingService = {
  getBookingByUserId,
  createBooking,
  updateRoomIdBooking
};

export default bookingService;
