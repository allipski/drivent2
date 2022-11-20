import { prisma } from "@/config";
import { CardData } from "@/utils/card-protocol";
import ticketsRepository from "@/repositories/tickets-repository";

async function findPaymentOfUserTicket(ticketId: number) {
  return prisma.payment.findFirst({
    where: {
      ticketId: ticketId
    }
  });
}

async function postPaymentOfUserTicket(ticketId: number, cardData: CardData) {
  const ticketInfo = await ticketsRepository.findTicketPriceByTicketId(ticketId);

  return await prisma.payment.create({
    data: {
      ticketId: ticketId,
      value: ticketInfo.TicketType.price,
      cardIssuer: cardData.issuer,
      cardLastDigits: String(cardData.number).slice(-4)
    }
  });  
}

const paymentsRepository = {
  findPaymentOfUserTicket,
  postPaymentOfUserTicket
};

export default paymentsRepository;
