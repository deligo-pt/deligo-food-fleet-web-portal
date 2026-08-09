import { useTranslation } from "@/hooks/use-translation";
import { IDocs } from "@/types/documents.type";
import { motion } from "framer-motion";
import Image from "next/image";

interface IProps {
  documents: IDocs | undefined;
}

export default function ProfileDoc({ documents }: IProps) {
  const { t } = useTranslation();
  const docsArr = Object.keys(documents || {}) as (keyof IDocs)[];

  return (
    <div className="grid grid-cols-1 gap-4">
      {docsArr.map((doc, i) => {
        const files = documents?.[doc];

        if (!files || files.length === 0) return null;

        return (
          <motion.div
            key={i}
            whileHover={{
              x: 4,
            }}
          >
            <p className="text-sm text-gray-500 mb-2">
              {doc === "myPhoto" && t("myPhoto")}
              {doc === "idProofFront" && t("documentsLabel2")}
              {doc === "idProofBack" && t("documentsLabel3")}
              {doc === "businessLicense" && t("documentsLabel1")}
              {doc === "proofOfAddress" && t("proof_of_address")}
              {doc === "activityDocument" && t("activity_document")}
              {doc === "ibanProof" && t("iban_proof")}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {files.map((file, index) => {
                const isPdf = file.toLowerCase().endsWith(".pdf");

                return (
                  <div key={index}>
                    {isPdf ? (
                      <iframe
                        src={file}
                        className="w-full h-40 rounded-lg border border-gray-200"
                      />
                    ) : (
                      <Image
                        src={file}
                        alt={`${doc}-${index}`}
                        width={500}
                        height={500}
                        className="w-full h-40 object-cover rounded-lg border border-gray-200"
                      />
                    )}

                    <motion.a
                      href={file}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 text-sm text-[#DC3173] hover:underline inline-block"
                    >
                      {t("view_full_file")}
                    </motion.a>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )
      })}
    </div>
  );
}
