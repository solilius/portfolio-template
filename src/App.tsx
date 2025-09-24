import React from "react";
import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { styled } from "styled-components";
import MainPage from "./Pages/MainPage";
import ContactPage from "./Pages/ContactPage";
import SelfSummary from "./Components/SelfSummary";
import AboutMe from "./Pages/AboutMe";
import { Column } from "./Styles/StyledComponents";
import Footer from "./Components/Footer";
import ModelingPage from "./Pages/ModelingPage";

const AppContainer = styled(Column)`
  min-height: 90vh;
  padding: 60px;
  gap: 30px;

  @media (max-width: 768px) {
    gap: 0;
    padding: 30px 10px;
  }
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
  gap: 30px;

  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

const NavbarLink = styled(Link)`
  font-size: 2.2rem;
  text-decoration: none;
  color: green;
  font-weight: bold;

  &:hover {
    color: lightgreen;
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
      font-size: 1rem;
      margin-bottom: 0;
  }
  `;

const App: React.FC = () => {
  window.addEventListener("scroll", function () {
    document.body.style.backgroundPosition = `${window.scrollY * 0.05}px ${window.scrollY * 0.8}px`;
  });

  return (
    <Router>
      <AppContainer>
        <SelfSummary />

        <Navbar>
          <NavbarLink to="/">Games 👾</NavbarLink>
          <NavbarLink to="/3D-modeling">3D👾</NavbarLink>
          <NavbarLink to="/about-me">About me 👨🏻‍💻</NavbarLink>
          <NavbarLink to="/contact">Contact 💬</NavbarLink>
        </Navbar>

        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about-me" element={<AboutMe />} />
          <Route path="/3D-modeling" element={<ModelingPage />} />
        </Routes>
      </AppContainer>
      <Footer />
    </Router>
  );
};

export default App;
