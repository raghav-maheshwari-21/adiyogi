import Navbar from "../components/common/Navbar";
import FloatingActions from "../components/common/FloatingActions";
import LeadPopupTrigger from "../components/common/LeadPopupTrigger";
import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import BenefitsSection from "../components/sections/BenefitsSection";
import ClassesSection from "../components/sections/ClassesSection";
import Marquee from "../components/sections/Marquee";
import InstructorSection from "../components/sections/InstructorSection";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import HowItWorks from "../components/sections/HowItWorks";
import ScheduleSection from "../components/sections/ScheduleSection";
import Testimonials from "../components/sections/Testimonials";
import Gallery from "../components/sections/Gallery";
import FAQ from "../components/sections/FAQ";
import CTASection from "../components/sections/CTASection";
import ContactSection from "../components/sections/ContactSection";
import Footer from "../components/layout/Footer";

export default function Home() {
    return (
        <>
            <Navbar />

            <main>
                <HeroSection />
                <StatsSection />
                <BenefitsSection />
                <ClassesSection />
                <Marquee />
                <InstructorSection />
                <WhyChooseUs />
                <HowItWorks />
                <ScheduleSection />
                <Testimonials />
                <Gallery />
                <FAQ />
                <CTASection />
                <ContactSection />
            </main>

            <Footer />
            <FloatingActions />
            <LeadPopupTrigger />
        </>
    );
}
