export type DocKey = "myPhoto" | "businessLicense" | "idProofFront" | "idProofBack" | "proofOfAddress" | "activityDocument" | "ibanProof";

export interface IDocs {
  myPhoto?: string[];
  idProofFront?: string[];
  idProofBack?: string[];
  businessLicense?: string[];
  proofOfAddress?: string[];
  activityDocument?: string[];
  ibanProof?: string[];
}

export type FilePreview = {
  file: File | null;
  url: string | null;
  isImage: boolean;
};

export const FLEET_REQUIRED_DOCS: DocKey[] = [
  "businessLicense",
  "proofOfAddress",
  "activityDocument",
  "ibanProof"
];

const FLEET_OPTIONAL_DOCS: DocKey[] = [
  "myPhoto",
  "idProofFront",
  "idProofBack",
]