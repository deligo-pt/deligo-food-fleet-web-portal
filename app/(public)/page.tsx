import AgentHeroBackground from '@/components/banner/Banner';
import UniqueBenefitsSection from '@/components/Benefits/benefits';
import CTASectionUnique from '@/components/CTASection/CTASection';
import FAQSection from '@/components/faq/faq';
import FloatingTestimonialCarousel from '@/components/Testimonials/Testimonials';
import HowItWorks from '@/components/Works/works';


const PublicHomePage = () => {
    return (
        <div>
            <AgentHeroBackground />
            <HowItWorks />
            <UniqueBenefitsSection />
            <FloatingTestimonialCarousel />
            <FAQSection />
            <CTASectionUnique />
        </div>
    );
};

export default PublicHomePage;