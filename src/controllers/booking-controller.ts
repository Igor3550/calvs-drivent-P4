import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import bookingService from "@/services/booking-service";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.userId);
  try {
    const booking = await bookingService.getBookingByUserId(userId);
    return res.send(booking);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(404);
    }
  }
}
