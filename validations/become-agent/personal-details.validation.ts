import parsePhoneNumberFromString from "libphonenumber-js";
import { z } from "zod";

export const personalDetailsValidation = z
  .object({
    firstName: z
      .string()
      .min(2, "First name must be at least 2 characters long")
      .max(30, "First name must be at most 30 characters long")
      .nonempty("First name is required"),

    lastName: z
      .string()
      .min(2, "Last name must be at least 2 characters long")
      .max(30, "Last name must be at most 30 characters long")
      .nonempty("Last name is required"),

    email: z.email("Invalid email address").nonempty("Email is required"),

    phoneNumber: z.string()
      .min(10, "Phone number is required")
      .refine((val) => {
        try {
          const phone = parsePhoneNumberFromString(val);
          return phone?.isValid() ?? false;
        } catch {
          return false;
        }
      }, "Invalid phone number for the selected country")
  })
