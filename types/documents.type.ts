export type DocKey = "businessLicense" | "idProof";

export type FilePreview = {
  file: File | null;
  url: string | null;
  isImage: boolean;
};
