"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircleIcon, LoaderIcon, Plus, User } from "lucide-react";
import { toast } from "sonner";
import { deleteFleetDocumentReq, updateFleetDocumentsReq, uploadImagesReq } from "@/services/becomeAgent/becomeAgentManagement";

interface IProps {
  /** Current myPhoto URL (first item of the array) */
  currentPhoto?: string;
  /** Required – same userId used everywhere else */
  userId: string;
  /** Optional – parent can refresh its own state */
  onPhotoChange?: (newUrl: string | null) => void;
}

export default function ProfilePhotoUpload({
  currentPhoto,
  userId,
  onPhotoChange,
}: IProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [photo, setPhoto] = useState<string | undefined>(currentPhoto);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const openPicker = () => {
    if (isUploading) return;
    inputRef.current?.click();
  };

  const handleFileChange = async (file?: File | null) => {
    if (!file) return;

    // reset native input
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    // only accept images
    if (!file.type.startsWith("image/")) {
      toast.error("Please select an image file");
      return;
    }

    setIsUploading(true);
    setUploadSuccess(false);

    const toastId = toast.loading("Uploading profile photo...");

    try {
      // 1. If there is already a photo → delete it first (myPhoto limit = 1)
      if (photo) {
        const deleteResult = await deleteFleetDocumentReq(userId, {
          docImageTitle: "myPhoto",
          imageUrl: photo,
        });

        if (!deleteResult.success) {
          toast.error(deleteResult.message || "Failed to remove previous photo", {
            id: toastId,
          });
          setIsUploading(false);
          return;
        }
      }

      // 2. Upload the new image
      const uploadResult = await uploadImagesReq([file]);

      if (!uploadResult.success || !uploadResult.data?.[0]) {
        toast.error(uploadResult.message || "Upload failed", { id: toastId });
        setIsUploading(false);
        return;
      }

      const newUrl = uploadResult.data[0];

      // 3. Persist as myPhoto (single item)
      const updateResult = await updateFleetDocumentsReq(userId, {
        docImageTitle: "myPhoto",
        docImageUrls: [newUrl],
      });

      if (!updateResult.success) {
        // best-effort rollback
        await deleteFleetDocumentReq(userId, {
          docImageTitle: "myPhoto",
          imageUrl: newUrl,
        });
        toast.error(updateResult.message || "Failed to save photo", {
          id: toastId,
        });
        setIsUploading(false);
        return;
      }

      // 4. Success UI
      setPhoto(newUrl);
      onPhotoChange?.(newUrl);
      setUploadSuccess(true);
      toast.success("Profile photo updated!", { id: toastId });

      // hide success overlay after a short delay
      setTimeout(() => {
        setUploadSuccess(false);
      }, 1500);
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="relative">
      {/* Clickable avatar */}
      <motion.div
        className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-xl cursor-pointer"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 300 }}
        onClick={openPicker}
      >
        <AnimatePresence mode="wait">
          {photo ? (
            <motion.img
              key={photo}
              src={photo}
              alt="Profile"
              className="w-full h-full object-cover"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
            />
          ) : (
            <motion.div
              className="w-full h-full bg-linear-to-br from-[#DC3173] to-[#FF6B9D] flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <User className="w-12 h-12 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Upload overlay */}
        <AnimatePresence>
          {isUploading && (
            <motion.div
              className="absolute inset-0 bg-black/60 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <LoaderIcon className="w-8 h-8 text-white animate-spin" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Success overlay */}
        <AnimatePresence>
          {uploadSuccess && (
            <motion.div
              className="absolute inset-0 bg-[#DC3173]/90 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
            >
              <CheckCircleIcon className="w-12 h-12 text-white" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Plus button – always visible so user knows they can update */}
        {!isUploading && !uploadSuccess && (
          <div className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-[#DC3173] border-2 border-white shadow-md flex items-center justify-center pointer-events-none">
            <Plus className="w-4 h-4 text-white" strokeWidth={2.5} />
          </div>
        )}
      </motion.div>
      {/* Hidden file input */}
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) =>
          handleFileChange(e.target.files ? e.target.files[0] : null)
        }
      />
    </div>
  );
}