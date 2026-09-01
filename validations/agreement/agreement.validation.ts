import z from "zod";

export const fleetAgreementSchema = z.object({
    signatoryType: z.enum(["SELF", "AUTHORIZED_REPRESENTATIVE"] as const, {
        message: "Signatory type is required",
    }),
    partyRepresentativeName: z.string().optional(),
})
    .refine(
        (data) => {
            if (data.signatoryType === "AUTHORIZED_REPRESENTATIVE") {
                return !!data.partyRepresentativeName && data.partyRepresentativeName.trim().length > 0;
            }
            return true;
        },
        {
            message: "Representative name is required for authorized representatives",
            path: ["partyRepresentativeName"],
        }
    )

export type TFleetAgreementForm = z.infer<typeof fleetAgreementSchema>;