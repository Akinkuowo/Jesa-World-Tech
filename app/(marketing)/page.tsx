import HeroSection from "./_components/hero-section";
import ServicesSection from "./_components/services-section";
import StatsSection from "./_components/stats-section";
import AboutSection from "./_components/about-section";
import PortfolioSection from "./_components/portfolio-section";
import TestimonialsSection from "./_components/testimonials-section";
import CareersSection from "./_components/careers-section";
import ContactSection from "./_components/contact-section";
import { db } from "@/lib/db";

export default async function HomePage() {
  const featuredProjects = await db.project.findMany({
    where: {
      isPublished: true,
      isFeatured: true,
    },
    orderBy: { order: "asc" },
    take: 6,
  });

  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <AboutSection />
      <PortfolioSection projects={featuredProjects} />
      <TestimonialsSection />
      <CareersSection />
      <ContactSection />
    </>
  );
}
