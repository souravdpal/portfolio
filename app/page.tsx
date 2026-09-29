import { ThemeProvider } from "./components/context_theme";
import { AuroraBackground } from "./components/Aurorabackground";
import { Navbar } from "./components/nav";
import { Hero } from "./components/Hero";
import { Work } from "./components/work";
import { About } from "./components/About";
import { Contact } from "./components/contact";
import { Footer } from "./components/footer";
import { SiteStyles } from "./components/sitestyles";
import { MediaStyles } from "./components/mediastyles";

export default function Home() {
  return (
    <ThemeProvider>
      <AuroraBackground />
      <Navbar />
      <main>
        <Hero />
        <Work />
        <About />
        <Contact />
      </main>
      <Footer />
      <SiteStyles />
      <MediaStyles />
    </ThemeProvider>
  );
}