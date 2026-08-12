import Hero from "../components/Hero";
import About from "../components/About";
import HowItWorks from "../components/HowItWorks";
import Features from "../components/Features";
import Testimonials from "../components/Testimonials";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";
import Contact from "../components/Contact";

export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <HowItWorks />
            <Features />
            <Testimonials />
            <Pricing />
            <FAQ />
            <Contact />
        </>
    );
}