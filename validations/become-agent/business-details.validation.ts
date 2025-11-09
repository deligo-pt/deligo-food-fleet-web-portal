import { z } from "zod";

export const businessDetailsValidation = z.object({
  businessName: z
    .string()
    .min(2, "Business name must be at least 2 characters long")
    .max(100, "Business name must be at most 100 characters long")
    .nonempty("Business name is required"),

  businessLicenseNumber: z
    .string()
    .min(5, "Business license number must be at least 5 characters long")
    .max(50, "Business license number must be at most 50 characters long")
    .nonempty("Business license number is required"),

  NIF: z
    .string()
    .min(9, "NIF must be at least 9 characters long")
    .max(15, "NIF must be at most 15 characters long")
    .nonempty("NIF is required"),
});
