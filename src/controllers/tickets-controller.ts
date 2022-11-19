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
    return res.sendStatus(httpStatus.NO_CONTENT);
  }
}

export async function postTicket(req: AuthenticatedRequest, res: Response) {
  const { userId }: { userId: number } = req;
  const { ticketTypeId }: { ticketTypeId: number } = req.body;
  try {
    await ticketsService.createUserTicket({ ticketTypeId: ticketTypeId, userId: userId });

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
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
