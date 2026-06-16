import Navbar from "../components/common/Navbar";
import FloatingActions from "../components/common/FloatingActions";
import HeroSection from "../components/sections/HeroSection";
import StatsSection from "../components/sections/StatsSection";
import InstructorSection from "../components/sections/InstructorSection";
import BenefitsSection from "../components/sections/BenefitsSection";
import ClassesSection from "../components/sections/ClassesSection";
import WhyChooseUs from "../components/sections/WhyChooseUs";
import Testimonials from "../components/sections/Testimonials";
import Gallery from "../components/sections/Gallery";
import FAQ from "../components/sections/FAQ";
import ContactSection from "../components/sections/ContactSection";
import CTASection from "../components/sections/CTASection";
import Footer from "../components/layout/Footer";
import SEO from "../components/common/SEO";
import ScrollToTop from "../components/common/ScrollToTop";

export default function Home() {
    return (
        <>
            <SEO
                title="Yoga Classes"
                description="Transform your body and mind with AdiYogi Yoga Classes."
            />

            <Navbar />

            <main>
                <HeroSection />

                <StatsSection />

                <InstructorSection />

                <BenefitsSection />

                <ClassesSection />

                <WhyChooseUs />

                <Testimonials />

                <Gallery />

                <FAQ />

                <CTASection />

                <ContactSection />
            </main>

            <Footer />
            <FloatingActions />
        </>
    );
}