export type DocKey = "myPhoto" | "businessLicense" | "idProofFront" | "idProofBack" | "proofOfAddress" | "activityDocument";

export type FilePreview = {
  file: File | null;
  url: string | null;
  isImage: boolean;
};
