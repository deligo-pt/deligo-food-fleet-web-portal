import { useTranslation } from "@/hooks/use-translation";
import { IDocs } from "@/types/documents.type";
import { DocumentViewer, IDocSection } from "../Modals/DocumentViewer";

interface IProps {
  documents: IDocs | undefined;
}

const DOC_TRANSLATION_MAP: Record<keyof IDocs, string> = {
  idProofFront: "id_proof_front",
  idProofBack: "id_proof_back",
  businessLicense: "business_license",
  activityDocument: "activity_document",
  myPhoto: "my_photo",
  proofOfAddress: "proof_of_address",
  ibanProof: "iban_proof",
};

export default function ProfileDoc({ documents }: IProps) {
  const { t } = useTranslation();

  const sections: IDocSection[] = (
    Object.keys(DOC_TRANSLATION_MAP) as (keyof IDocs)[]
  ).map((key) => ({
    key,
    label: t(DOC_TRANSLATION_MAP[key]),
    files: documents?.[key] || [],
  }));

  return <DocumentViewer sections={sections} emptyMessageKey="no_document_uploaded" />;
}
