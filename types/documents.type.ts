export type DocKey = "myPhoto" | "businessLicense" | "idProofFront" | "idProofBack" | "proofOfAddress" | "activityDocument";

export interface IDocs {
  myPhoto?: string[];
  idProofFront?: string[];
  idProofBack?: string[];
  businessLicense?: string[];
  proofOfAddress?: string[];
  activityDocument?: string[];
}

export type FilePreview = {
  file: File | null;
  url: string | null;
  isImage: boolean;
};
