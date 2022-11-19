import { notFoundError } from "@/errors";
import ticketsRepository from "@/repositories/tickets-repository";

async function checkIfEnrollment(userId: number) {
  return await ticketsRepository.existEnrollment(userId);
}

async function findUserTickets(userId: number) {
  const existEnrollment = await checkIfEnrollment(userId);

  if (!existEnrollment) {
    throw notFoundError();
  }

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

async function createUserTicket( ticketTypeId: number, userId: number ) {
  const existEnrollment = await checkIfEnrollment(userId);

  if (!existEnrollment) {
    throw notFoundError();
  }

  return await ticketsRepository.createUserTicket( ticketTypeId, userId );
}

const ticketsService = {
  findUserTickets,
  findTicketTypes,
  createUserTicket,
};

export default ticketsService;
