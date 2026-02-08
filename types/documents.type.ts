export type DocKey = "myPhoto" | "businessLicense" | "idProofFront" | "idProofBack";

export type FilePreview = {
  file: File | null;
  url: string | null;
  isImage: boolean;
};
