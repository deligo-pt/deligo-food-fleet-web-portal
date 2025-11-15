import z from "zod";

export const vehicleInfoValidation = z
  .object({
    vehicleType: z.enum(
      ["BICYCLE", "E-BIKE", "SCOOTER", "MOTORBIKE", "CAR"],
      "Vehicle type is required"
    ),

    brand: z
      .string()
      .min(2, "Brand must be at least 2 character")
      .max(50, "Brand must be at most 50 characters")
      .optional(),

    model: z
      .string()
      .min(2, "Brand must be at least 2 character")
      .max(50, "Brand must be at most 50 characters")
      .optional(),

    licensePlate: z
      .string()
      .min(2, "Brand must be at least 2 character")
      .max(50, "Brand must be at most 50 characters")
      .optional(),

    drivingLicenseNumber: z
      .string()
      .min(2, "Brand must be at least 2 character")
      .max(50, "Brand must be at most 50 characters")
      .optional(),

    drivingLicenseExpiry: z
      .string()
      .refine((value) => {
        return Date.parse(value);
      }, "Invalid date format")
      .optional(),

    insurancePolicyNumber: z
      .string()
      .min(2, "Brand must be at least 2 character")
      .max(50, "Brand must be at most 50 characters")
      .optional(),

    insuranceExpiry: z.string().refine((value) => {
      return Date.parse(value);
    }, "Invalid date format"),
  })
  .refine((data) => {
    if (
      data.vehicleType === "CAR" ||
      data.vehicleType === "SCOOTER" ||
      data.vehicleType === "MOTORBIKE"
    ) {
      return (
        data.licensePlate !== "" &&
        data.drivingLicenseNumber !== "" &&
        data.drivingLicenseExpiry !== "" &&
        data.insurancePolicyNumber !== "" &&
        data.insuranceExpiry !== ""
      );
    }
    return true;
  }, "License plate, driving license number, driving license expiry, insurance policy number and insurance expiry is required if vehicle type is car, scooter or bike");
