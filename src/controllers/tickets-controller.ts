import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/tickets-service";
import { Response } from "express";
import httpStatus from "http-status";

export async function getTickets(req: AuthenticatedRequest, res: Response) {
  const { userId }: { userId: number } = req;

  try {
    const userTickets = await ticketsService.findUserTickets(userId);
    
    return res.status(httpStatus.OK).send(userTickets);
  } catch (error) {
    if (error.name === "NotFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const userId: number = req.userId;

  if (req.body.ticketTypeId === undefined) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }

  const ticketTypeId = req.body.ticketTypeId;

  try {
    const createdTicket = await ticketsService.createUserTicket( ticketTypeId, userId );

    return res.status(httpStatus.CREATED).send(createdTicket);
  } catch (error) {    
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getTicketTypes(req: AuthenticatedRequest, res: Response) {
  try {
    const ticketTypes = await ticketsService.findTicketTypes();

    return res.status(httpStatus.OK).send(ticketTypes);
  } catch (error) {
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}
