import { prisma } from "@/config";

async function findBookingById(bookingId: number) {
  return prisma.booking.findFirst({
    where: {
      id: bookingId
    }
  });
}

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

async function updateBooking(bookingId: number, newRoomId: number) {
  return prisma.booking.update({
    where: {
      id: bookingId
    },
    data: {
      roomId: newRoomId
    }
  });
}

const bookingRepository = {
  findBookingByUserId,
  insertBooking,
  findRoomBookings,
  updateBooking,
  findBookingById
};

export default bookingRepository;
