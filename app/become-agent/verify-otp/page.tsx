import VerifyOtp from "@/components/BecomeAgent/VerifyOtp";

export default function VerifyOtpPage({
  searchParams,
}: {
  searchParams: { email: string };
}) {
  return <VerifyOtp email={searchParams.email || ""} />;
}
