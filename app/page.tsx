import AgentHeroBackground from "@/components/banner/Banner";
import BenefitsSection from "@/components/Benefits/benefits";
import CTASection from "@/components/CTASection/CTASection";
import FAQSection from "@/components/faq/faq";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/navbar/Header";
import TestimonialsSection from "@/components/Testimonials/Testimonials";
import HowItWorks from "@/components/Works/works";
import { serverRequest } from "@/lib/serverFetch";
import { TFleetManager } from "@/types/fleet-manager.type";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export default async function Home() {
  const accessToken = (await cookies()).get("accessToken")?.value || "";
  let fleetData: TFleetManager = {} as TFleetManager;

  if (accessToken) {
    const decoded = jwtDecode(accessToken) as { role: string };

    if (decoded && decoded?.role === "FLEET_MANAGER") {
      try {
        const result = await serverRequest.get("profile");

        if (result?.success) {
          fleetData = result?.data;
        }
      } catch (err) {
        console.error("Server fetch error:", err);
      }
    }
  }

  return (
    <div className="min-h-screen">
      <Header fleetData={fleetData} />
      <AgentHeroBackground />
      <HowItWorks />
      <BenefitsSection />
      <TestimonialsSection />
      <FAQSection />
      <CTASection />
      <Footer />
    </div>
  );
}
