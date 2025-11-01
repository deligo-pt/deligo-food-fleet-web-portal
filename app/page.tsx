
import AgentHeroBackground from "@/components/banner/Banner";
import BenefitsSection from "@/components/Benefits/benefits";
import CTASection from "@/components/CTASection/CTASection";
import FAQSection from "@/components/faq/faq";
import Footer from "@/components/Footer/Footer";
import Header from "@/components/navbar/Header";
import TestimonialsSection from "@/components/Testimonials/Testimonials";
import HowItWorks from "@/components/Works/works";


export default function Home() {
  return (
    <div className="min-h-screen">
      <Header/>
      <AgentHeroBackground/>
      <HowItWorks/>
      <BenefitsSection/>
      <TestimonialsSection/>
      <FAQSection/>
      <CTASection/>
      <Footer/>
   </div>
  );
}
