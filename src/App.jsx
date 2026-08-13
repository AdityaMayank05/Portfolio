import React, { useState } from "react";
import NavbarMain from "./components/navbar/NavbarMain";
import HeroMain from "./components/heroSection/HeroMain";
import AboutMeMain from "./components/aboutMeSection/AboutMeMain";
import SkillsMain from "./components/skillsSection/SkillsMain";
import ProjectsMain from "./components/projectsSection/ProjectsMain";
import ContactMeMain from "./components/contactMeSection/ContactMeMain";
import FooterMain from "./components/footer/FooterMain";
import CustomCursor from "./components/CustomCursor";
import Preloader from "./components/Preloader";
import TravelingPhoto from "./components/TravelingPhoto";

function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      <CustomCursor />
      <TravelingPhoto />
      <NavbarMain />
      <main>
        <HeroMain />
        <AboutMeMain />
        <SkillsMain />
        <ProjectsMain />
        <ContactMeMain />
      </main>
      <FooterMain />
    </>
  );
}

export default App;
