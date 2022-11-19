import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTickets, postTicket, getTicketTypes } from "@/controllers";

const ticketsRouter = Router();

ticketsRouter
  .all("/*", authenticateToken)
  .get("/", getTickets)
  .get("/types", getTicketTypes)
  .post("/", postTicket);

export { ticketsRouter };
