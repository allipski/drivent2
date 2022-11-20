import { prisma } from "@/config";

async function findTicketTypes() {
  return prisma.ticketType.findMany();
}

const ticketTypeRepository = {
  findTicketTypes
};

export default ticketTypeRepository;
