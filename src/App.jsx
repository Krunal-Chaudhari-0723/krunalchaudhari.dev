// App.js - Using HashRouter (Corrected)
import { HashRouter, Routes, Route } from "react-router-dom";
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

function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Achievements />
      <Projects />
      <Experience />
      <Contact />
    </>
  );
}

function App() {
  return (
    <HashRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/achievements" element={<Achievements />} /> {/* 👈 Fixed spelling */}
        <Route path="/projects" element={<Projects />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
      <SpeedInsights />
      <ChatWidget />
    </HashRouter>
  );
}

export default App;