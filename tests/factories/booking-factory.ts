import { prisma } from "@/config";
import { TicketStatus } from "@prisma/client";
import {
  createEnrollmentWithAddress,
  createUser,
  createTicket,
  createTicketTypeWithHotel,
} from "../factories";

export async function createBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId
    }
  });
}

export async function createFakeBooking(roomId: number) {
  const user = await createUser();
  const enrollment = await createEnrollmentWithAddress(user);
  const ticketType = await createTicketTypeWithHotel();
  await createTicket(enrollment.id, ticketType.id, TicketStatus.PAID);

  return await createBooking(user.id, roomId);
}
