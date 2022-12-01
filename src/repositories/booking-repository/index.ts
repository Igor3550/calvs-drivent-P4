import { prisma } from "@/config";

async function findRoomBookings(roomId: number) {
  return prisma.room.findUnique({
    where: {
      id: roomId
    },
    include: {
      _count: {
        select: { Booking: true },
      },
    }
  });
}

async function findBookingByUserId(userId: number) {
  return prisma.booking.findFirst({
    where: {
      userId: userId
    },
    include: {
      Room: true
    }
  });
}

async function insertBooking(userId: number, roomId: number) {
  return prisma.booking.create({
    data: {
      userId: userId,
      roomId: roomId
    }
  });
}

const bookingRepository = {
  findBookingByUserId,
  insertBooking,
  findRoomBookings
};

export default bookingRepository;
