import { z } from "zod";

export const ticketValidation = z.object({
  category: z.enum(
    ["GENERAL", "PAYMENT", "IVA_INVOICE", "TECHNICAL"],
    "Category must be one of the following: GENERAL, PAYMENT, IVA_INVOICE, TECHNICAL",
  ),
  message: z
    .string()
    .min(1, "Message should be at least 1 character long")
    .max(1000, "Message should be at most 1000 characters long")
    .nonempty("Message is required"),
});
