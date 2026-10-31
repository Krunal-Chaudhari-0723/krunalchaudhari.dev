// App.js - Single page; Navbar keeps the URL (/about, /contact, ...) in sync with the section in view
import { MotionConfig } from "framer-motion";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Achievements from "./components/Achievements";
import ChatWidget from "./components/chat/ChatWidget";
import useCardSpotlight from "./lib/useCardSpotlight";

function App() {
  useCardSpotlight();

  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Skills />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <SpeedInsights />
      <ChatWidget />
    </MotionConfig>
  );
}

export default App;
