import { prisma } from "@/config";

async function existEnrollment(userId: number) {
  return prisma.enrollment.findFirst({
    where: {
      userId: userId
    }
  });
}

async function findTicketTypes() {
  return prisma.ticketType.findMany();
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
  findTicketTypes,
  findUserTicket,
  createUserTicket,
  existEnrollment
};

export default ticketsRepository;
