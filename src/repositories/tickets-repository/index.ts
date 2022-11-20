import { prisma } from "@/config";

async function findTicketById(ticketId: number) {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId
    }
  });
}

async function findTicketPriceByTicketId(ticketId: number) {
  return prisma.ticket.findUnique({
    where: {
      id: ticketId
    },
    include: {
      TicketType: true
    }
  });
}

async function updateTicketStatusById(ticketId: number) {
  return prisma.ticket.update({
    where: {
      id: ticketId
    },
    data: {
      status: "PAID"
    }
  });
}

async function findTicketBelongsToUser(ticketId: number, userId: number) {
  return prisma.ticket.findFirst({
    where: {
      AND: [{
        id: ticketId
      }, {
        Enrollment: {
          userId: userId
        }
      }]
    }
  });
}

async function findUserTicket(userId: number) {
  return prisma.ticket.findFirst({
    where: {
      Enrollment: {
        userId: userId
      }
    },
    include: {
      TicketType: true
    }
  });
}

async function createUserTicket( ticketTypeId: number, userId: number ) {
  const enrollmentId = await prisma.enrollment.findFirst({
    where: {
      userId: userId
    }
  });

  return prisma.ticket.create({
    include: {
      TicketType: true
    },
    data: {
      status: "RESERVED",
      ticketTypeId: ticketTypeId,
      enrollmentId: enrollmentId.id
    }
  });
}

const ticketsRepository = {
  updateTicketStatusById,
  findUserTicket,
  createUserTicket,
  findTicketById,
  findTicketBelongsToUser,
  findTicketPriceByTicketId
};

export default ticketsRepository;
