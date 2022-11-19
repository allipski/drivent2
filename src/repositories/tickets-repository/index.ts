import { prisma } from "@/config";

async function findTicketTypes() {
  return prisma.ticketType.findMany();
}

async function findUserTicket(userId: number) {
  return prisma.ticket.findMany({
    where: {
      Enrollment: {
        User: {
          id: userId
        }
      }
    }
  });
}

async function createUserTicket({ ticketTypeId: ticketTypeId, userId: userId }: { ticketTypeId: number; userId: number }) {
  return prisma.ticket.create({

  });
}

const ticketsRepository = {
  findTicketTypes,
  findUserTicket,
  createUserTicket
};

export default ticketsRepository;
