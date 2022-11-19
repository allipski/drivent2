import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";

async function findUserTickets(userId: number) {
  const userTickets = await ticketsRepository.findUserTicket(userId);
  if(!userTickets) {
    throw notFoundError();
  }
  return userTickets;
}

async function findTicketTypes() {
  const ticketTypes = await ticketsRepository.findTicketTypes();
  if(!ticketTypes) {
    throw notFoundError();
  }
  return ticketTypes;
}

async function createUserTicket({ ticketTypeId, userId }: { ticketTypeId: number; userId: number }) {
  const createTicket = await ticketsRepository.createUserTicket({ ticketTypeId: ticketTypeId, userId: userId });
  if(!createTicket) {
    throw notFoundError();
  }
  return createTicket;
}

const ticketsService = {
  findUserTickets,
  findTicketTypes,
  createUserTicket,
};

export default ticketsService;
