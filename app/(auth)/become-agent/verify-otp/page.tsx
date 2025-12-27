import VerifyOtp from "@/components/BecomeAgent/VerifyOtp";

export default async function VerifyOtpPage({
  searchParams,
}: {
  searchParams: Promise<{ email: string }>;
}) {
  return <VerifyOtp email={(await searchParams).email || ""} />;
}
