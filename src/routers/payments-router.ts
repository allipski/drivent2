import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getTicketForPayment, postPayment } from "@/controllers";

const paymentsRouter = Router();

paymentsRouter
  .all("/*", authenticateToken)
  .get("/", getTicketForPayment)
  .post("/process", postPayment);

export { paymentsRouter };
