import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import bookingService from "@/services/booking-service";
import httpStatus from "http-status";

export async function getBooking(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.userId);
  try {
    const booking = await bookingService.getBookingByUserId(userId);
    return res.send(booking);
  } catch (error) {
    if(error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
  }
}

export async function createBooking(req: AuthenticatedRequest, res: Response) {
  const userId = Number(req.userId);
  const roomId = Number(req.body.roomId);

  if(!roomId) return res.sendStatus(httpStatus.NOT_FOUND);

  try {
    const booking = await bookingService.createBooking(userId, roomId);
    return res.status(httpStatus.OK).send(booking);
  } catch (error) {
    if(error.name === "NotFoundError") return res.sendStatus(httpStatus.NOT_FOUND);
    if(error.name === "ConflictError") return res.sendStatus(httpStatus.FORBIDDEN);
  }
}
