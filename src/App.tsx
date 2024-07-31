/* 
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg"; */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import { useState } from "react";
import FormLogin from "./comps/FormLogin";

function App() {
  const [user, setuser] = useState();

  return !user ? (
    <FormLogin />
  ) : (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
