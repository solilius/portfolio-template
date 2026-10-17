import React from "react";
import Nav from "./Components/Nav";
import Hero from "./Components/Hero";
import Featured from "./Components/Featured";
import GamesSection from "./Components/GamesSection";
import About from "./Components/About";
import Contact from "./Components/Contact";
import Footer from "./Components/Footer";

const App: React.FC = () => (
  <>
    <Nav />
    <main>
      <Hero />
      <Featured />
      <GamesSection />
      <About />
      <Contact />
    </main>
    <Footer />
  </>
);

export default App;
