import { SOS_ISSUE_TAGS } from "@/consts/sos.const";
import z from "zod";

export const createSosValidationSchema = z.object({
  userNote: z
    .string()
    .min(5, "Note will be at least 5 characters.")
    .max(200, "User note must be at most 200 characters"),
  issueTags: z
    .array(
      z.enum(
        SOS_ISSUE_TAGS,
        "Issue tags must be one of the following: Accident, Medical Emergency, Fire, Crime, Natural Disaster, Other",
      ),
    )
    .min(1, "Please select at least one issue tag"),
})
  .superRefine((data, ctx) => {
    const wordCount = data.userNote.length;

    if (wordCount < 5) {
      ctx.addIssue({
        path: ["userNote"],
        code: "custom",
        message: "Note must contain at least 5 words",
      });
    }
  });
