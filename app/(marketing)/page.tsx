import HeroSection from "./_components/hero-section";
import ServicesSection from "./_components/services-section";
import StatsSection from "./_components/stats-section";
import AboutSection from "./_components/about-section";
import PortfolioSection from "./_components/portfolio-section";
import TestimonialsSection from "./_components/testimonials-section";
import CareersSection from "./_components/careers-section";
import ContactSection from "./_components/contact-section";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection />
      <TestimonialsSection />
      <CareersSection />
      <ContactSection />
    </>
  );
}
