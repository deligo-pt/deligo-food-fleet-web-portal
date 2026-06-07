/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftCircle,
  CheckCircle2,
  Eye,
  File,
  FileText,
  ImageIcon,
  Trash2,
  UploadCloud,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "@/hooks/use-translation";
import { TResponse } from "@/types";
import { DocKey } from "@/types/documents.type";
import { getCookie } from "@/utils/cookies";
import { updateData } from "@/utils/requests";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { deleteFleetDocumentReq, updateFleetDocumentsReq, uploadImagesReq } from "@/services/becomeAgent/becomeAgentManagement";

export default function UploadDocuments({
  savedPreviews,
}: {
  savedPreviews: Record<DocKey, string[]>;
}) {
  const { t } = useTranslation();
  // store one preview per doc key
  const [previews, setPreviews] =
    useState<Record<DocKey, string[]>>({
      myPhoto: Array.isArray(savedPreviews.myPhoto) ? savedPreviews.myPhoto : [],
      businessLicense: Array.isArray(savedPreviews.businessLicense) ? savedPreviews.businessLicense : [],
      idProofFront: Array.isArray(savedPreviews.idProofFront) ? savedPreviews.idProofFront : [],
      idProofBack: Array.isArray(savedPreviews.idProofBack) ? savedPreviews.idProofBack : [],
      proofOfAddress: Array.isArray(savedPreviews.proofOfAddress) ? savedPreviews.proofOfAddress : [],
      activityDocument: Array.isArray(savedPreviews.activityDocument) ? savedPreviews.activityDocument : [],
    });

  const DOCUMENTS: {
    key: DocKey;
    label: string;
    prefersImagePreview: boolean;
  }[] = [
      {
        key: "myPhoto",
        label: t("myPhoto"),
        prefersImagePreview: false,
      },
      {
        key: "businessLicense",
        label: t("documentsLabel1"),
        prefersImagePreview: false,
      },
      {
        key: "idProofFront",
        label: t("documentsLabel2"),
        prefersImagePreview: true,
      },
      {
        key: "idProofBack",
        label: t("documentsLabel3"),
        prefersImagePreview: true,
      },
      {
        key: "proofOfAddress",
        label: t("proof_of_address"),
        prefersImagePreview: true,
      },
      {
        key: "activityDocument",
        label: t("activity_document"),
        prefersImagePreview: true,
      },
    ];

  const uploadLimits: Partial<Record<DocKey, number>> = {
    myPhoto: 1,
    proofOfAddress: 1,
    activityDocument: 1,

    // these can have up to 3 files
    businessLicense: 3,
    idProofFront: 3,
    idProofBack: 3,
  };
  const DEFAULT_LIMIT = 3;

  const isFormValid = DOCUMENTS.every(
    (d) => (previews[d.key]?.length || 0) > 0
  );

  // file input refs to trigger the browser picker
  const inputsRef = useRef<Record<string, HTMLInputElement | null>>({});

  // modal open state (auto-opened when all files selected)
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  // whether confetti should be running (true until user clicks Continue)
  const [confettiRunning, setConfettiRunning] = useState(false);

  // confetti canvas ref
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const confettiAnimRef = useRef<number | null>(null);
  const confettiParticlesRef = useRef<any[]>([]);

  // helper to open file input for a specific doc
  const openPicker = (key: DocKey) => {
    const el = inputsRef.current[key];
    el?.click();
  };

  // handle file selection (client-side only)
  const handleFileChange = async (key: DocKey, f?: File | null) => {
    const toastId = toast.loading("Uploading file...");
    if (!f) return;

    if (inputsRef.current[key]) {
      inputsRef.current[key]!.value = "";
    }

    const currentFiles = previews[key] || [];

    const limit = uploadLimits[key] ?? DEFAULT_LIMIT;

    if (currentFiles.length >= limit) {
      toast.error(
        limit === 1
          ? `You can only upload one ${key} document`
          : `You can only upload a maximum of ${limit} documents`,
        { id: toastId }
      );

      return;
    }

    try {
      const accessToken = getCookie("accessToken");
      const decoded = jwtDecode(accessToken || "") as { userId: string };

      const uploadResult = await uploadImagesReq([f]);

      if (!uploadResult.success) {
        toast.error(uploadResult.message || "File upload failed", {
          id: toastId,
        });
        return;
      }

      const newUrl = uploadResult.data?.[0];

      if (!newUrl) {
        toast.error("Upload failed: no file URL returned", {
          id: toastId,
        });
        return;
      }

      const prevUrls = (currentFiles || []).filter(
        (url): url is string => typeof url === "string" && url.trim() !== ""
      );

      const cleanUrls = [...prevUrls, newUrl].filter(
        (url): url is string => typeof url === "string" && url.trim() !== ""
      );

      // update fleet document with all URLs
      const updateResult = await updateFleetDocumentsReq(decoded.userId, {
        docImageTitle: key,
        docImageUrls: cleanUrls,
      });

      if (!updateResult.success) {
        await deleteFleetDocumentReq(decoded?.userId, {
          docImageTitle: key,
          imageUrl: newUrl,
        });

        toast.error(updateResult.message || "File upload failed", {
          id: toastId,
        });
        return;
      }

      toast.success("File uploaded successfully!", { id: toastId });

      setPreviews((p) => ({
        ...p,
        [key]: [...(p[key] || []), newUrl],
      }));

    } catch (error: any) {
      toast.error(error?.message || "File upload failed", {
        id: toastId,
      });
    }
  };

  // Remove selected file for a doc (and revoke URL)
  const removeFile = (key: DocKey, index: number) => {
    setPreviews((p) => ({
      ...p,
      [key]: p[key]?.filter((_, i) => i !== index) || [],
    }));
  };

  // CONFETTI: simple canvas confetti implementation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // adjust size to viewport
    function resize() {
      const c = canvasRef.current;
      if (!c) return;
      c.width = window.innerWidth;
      c.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // create particles
    function createParticles(count = 120) {
      const c = canvasRef.current;
      if (!c) {
        confettiParticlesRef.current = [];
        return;
      }
      const colors = ["#DC3173", "#FF7AB6", "#FFD1E6", "#FFC2D6", "#7C3AED"];
      const arr: any[] = [];
      for (let i = 0; i < count; i++) {
        arr.push({
          x: Math.random() * c.width,
          y: Math.random() * -c.height * 0.2,
          w: 6 + Math.random() * 8,
          h: 8 + Math.random() * 8,
          color: colors[Math.floor(Math.random() * colors.length)],
          rotation: Math.random() * 360,
          speedY: 2 + Math.random() * 6,
          speedX: Math.random() * 4 - 2,
          tilt: Math.random() * 0.5,
        });
      }
      confettiParticlesRef.current = arr;
    }

    function draw() {
      if (!ctx) return;
      const c = ctx.canvas;
      ctx.clearRect(0, 0, c.width, c.height);
      const particles = confettiParticlesRef.current;
      for (let p of particles) {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        // draw rectangle confetti
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        // update
        p.y += p.speedY + Math.sin(p.tilt * 10);
        p.x += p.speedX;
        p.rotation += 4;
        if (p.y > c.height + 20) {
          // recycle to top
          p.y = -10 - Math.random() * 100;
          p.x = Math.random() * c.width;
        }
      }
    }

    function animate() {
      draw();
      confettiAnimRef.current = requestAnimationFrame(animate);
    }

    if (confettiRunning) {
      createParticles(160);
      animate();
    } else {
      // stop animation and clear particles
      if (confettiAnimRef.current)
        cancelAnimationFrame(confettiAnimRef.current);
      confettiAnimRef.current = null;
      confettiParticlesRef.current = [];
      const c = ctx.canvas;
      ctx.clearRect(0, 0, c.width, c.height);
    }

    return () => {
      window.removeEventListener("resize", resize);
      if (confettiAnimRef.current)
        cancelAnimationFrame(confettiAnimRef.current);
    };
    // intentionally watching confettiRunning only
  }, [confettiRunning]);

  // cleanup object URLs on unmount
  useEffect(() => {
    return () => {
      Object.values(previews).forEach((previewArray) => {
        if (Array.isArray(previewArray)) {
          previewArray.forEach((p) => {
            if (p && p) URL.revokeObjectURL(p);
          });
        }
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Continue button handler: stop confetti and close modal (later you can trigger API)
  const handleContinue = async () => {
    const toastId = toast.loading("Submitting...");
    try {
      const accessToken = getCookie("accessToken");
      const decoded = jwtDecode(accessToken || "") as { userId: string };
      const result = (await updateData(
        `/auth/${decoded.userId}/submitForApproval`,
        {},
        {
          headers: { authorization: accessToken || "" },
        },
      )) as unknown as TResponse<any>;
      if (result.success) {
        toast.success("Request submitted successfully!", {
          id: toastId,
        });
        setConfettiRunning(true);
        setShowModal(true);
      }
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Request submission failed",
        { id: toastId },
      );
      console.log(error);
    }
  };

  function getActualFileName(url: string): string {
    try {
      const decoded = decodeURIComponent(url);
      const lastSegment = decoded.split("/").pop() || "";
      const match = lastSegment.match(/file-(.+)$/);
      return match ? match[1] : lastSegment;
    } catch {
      return "";
    }
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-white via-gray-50 to-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Card className="rounded-2xl shadow-2xl overflow-hidden border border-gray-200 relative">
          <div className="relative p-0">
            <Button
              onClick={() => router.push("/become-agent/bank-details")}
              variant="link"
              className="inline-flex items-center px-4 text-sm gap-2 text-[#DC3173] p-0 h-4 absolute -top-2 z-10 cursor-pointer"
            >
              <ArrowLeftCircle /> {t("go_back")}
            </Button>
          </div>
          <CardHeader className="bg-linear-to-r from-[#DC3173] to-pink-600 p-6 text-white">
            <div className="flex items-center gap-4">
              <div className="rounded-xl bg-white/20 p-3 shadow-md">
                <UploadCloud className="w-7 h-7 text-white" />
              </div>
              <div>
                <CardTitle className="text-2xl font-semibold tracking-wide">
                  {t("uploadDocuments")}
                </CardTitle>
                <p className="mt-2 text-sm text-white/90 max-w-2xl leading-relaxed">
                  {t("uploadDocDesc")}
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="bg-white p-8 space-y-6">
            <div className="grid grid-cols-1 gap-4">
              {DOCUMENTS.map((d, idx) => {
                const previewFiles = previews[d.key];
                const isSelected = Array.isArray(previewFiles) && previewFiles.length > 0;
                const hasFiles = Array.isArray(previewFiles) && previewFiles.length > 0;


                return (
                  <motion.div
                    key={d.key}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.06 }}
                    className={`flex flex-col sm:flex-row sm:gap-0 gap-5 items-center justify-between p-4 border rounded-xl shadow-sm hover:shadow-md transition-all ${isSelected
                      ? "border-[#DC3173]/30 bg-[#FFF7FB]"
                      : "bg-white"
                      }`}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div
                        className={`w-14 h-14 rounded-lg flex items-center justify-center ${isSelected ? "bg-[#DC3173]/10" : "bg-gray-50"
                          }`}
                      >
                        {d.prefersImagePreview ? (
                          <ImageIcon className="w-6 h-6 text-[#DC3173]" />
                        ) : (
                          <FileText className="w-6 h-6 text-[#DC3173]" />
                        )}
                      </div>

                      <div className="min-w-0">
                        <div className="text-sm font-semibold text-gray-800">
                          {d.label}
                        </div>
                        <div className="text-xs text-gray-500 mt-1 space-y-1">
                          {
                            hasFiles ? (previewFiles || [])?.map((url, i) => (
                              <div className="flex items-center gap-2 w-full"
                                key={i}>
                                {/\.(jpg|jpeg|png|webp|gif|avif)$/i.test(url) ? (
                                  <div className="flex items-center gap-2 border p-1 rounded-md">
                                    <Image
                                      src={url}
                                      alt="document"
                                      width={56}
                                      height={40}
                                      className="object-cover rounded-md border"
                                      unoptimized
                                    />
                                    <div className="truncate hidden sm:block">
                                      {(url && url.length > 30) ? getActualFileName(url)?.slice(0, 30) : getActualFileName(url)}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="truncate">
                                    {(url && url.length > 30) ? getActualFileName(url)?.slice(0, 30) : getActualFileName(url || "")}
                                  </div>
                                )}


                                <button
                                  onClick={() => window.open(url, "_blank")}
                                  className="inline-flex items-center gap-1 p-2 rounded-lg text-xs font-medium text-[#DC3173] border border-[#DC3173]/20 hover:bg-[#DC3173]/5 transition"
                                >
                                  <Eye className="w-3 h-3 text-[#DC3173]" />
                                  <span className="hidden sm:block">View</span>
                                </button>

                                <button
                                  onClick={() => removeFile(d.key, i)}
                                  className="inline-flex items-center gap-1 p-2 rounded-lg text-xs font-medium text-[#DC3173] border border-[#DC3173]/20 hover:bg-[#DC3173]/5 transition"
                                >
                                  <Trash2 className="w-3 h-3 text-[#DC3173]" />
                                  <span className="hidden sm:block">{t("removeCTA")}</span>
                                </button>
                              </div>
                            )) : (
                              <span>{t("noFileSelected")}</span>
                            )
                          }
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* hidden native input */}
                      <input
                        ref={(el) => {
                          inputsRef.current[d.key] = el;
                        }}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          handleFileChange(
                            d.key,
                            e.target.files ? e.target.files[0] : null,
                          )
                        }
                      />

                      {isSelected ? (
                        <button
                          onClick={() => openPicker(d.key)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#DC3173] border border-[#DC3173]/20 hover:bg-[#DC3173]/5 transition w-32"
                        >
                          <UploadCloud className="w-4 h-4" />
                          Add More
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={() => openPicker(d.key)}
                          className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-[#DC3173] border border-[#DC3173]/20 hover:bg-[#DC3173]/5 transition w-32"
                        >
                          <UploadCloud className="w-4 h-4" />
                          {t("selectFileCTA")}
                        </button>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>

            <div className="pt-6">
              <div className="text-sm text-gray-500">{t("tipDesc")}</div>
            </div>
            <div className="pt-4">
              <Button
                disabled={!isFormValid}
                onClick={handleContinue}
                className="bg-[#DC3173] hover:bg-[#b72a63] text-white px-6 py-3 rounded-xl shadow-lg"
              >
                {t("completeRegistrationCTA")}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Full-screen success modal + confetti */}
      <AnimatePresence>
        {showModal && (
          <>
            {/* dim layer */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.55 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 bg-black z-40"
            />

            {/* confetti canvas covers entire screen */}
            <canvas
              ref={canvasRef}
              className="fixed inset-0 pointer-events-none z-50"
              style={{ width: "100vw", height: "100vh" }}
            />

            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
            >
              <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 text-center">
                <div className="flex items-center justify-center mb-4">
                  <div className="rounded-full bg-[#DC3173]/10 p-4">
                    <CheckCircle2 className="w-12 h-12 text-[#DC3173]" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  {t("registrationComplete")}
                </h2>
                <p className="mt-3 text-sm text-gray-600">
                  {t("registrationCompleteDesc")}
                </p>

                <div className="mt-6 flex items-center justify-center gap-3">
                  <Button
                    onClick={() =>
                      router.push("/become-agent/registration-status")
                    }
                    className="bg-[#DC3173] hover:bg-[#b72a63] text-white px-6 py-3 rounded-xl shadow-lg"
                  >
                    {t("seeRegistrationStatus")}
                  </Button>

                  <button
                    onClick={() => {
                      setConfettiRunning(false);
                      setShowModal(false);
                      router.push("/");
                    }}
                    className="px-4 py-3 rounded-xl border border-gray-200 text-sm"
                  >
                    {t("goHome")}
                  </button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
