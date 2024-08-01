/* 
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg"; */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import { createContext, useState } from "react";
import FormLogin from "./comps/FormLogin";
import { Login } from "./helpers/sb";
import Logout from "./pages/Logout";
import { User } from "./types";

export const UserContext = createContext<any>(undefined);

function App() {
  const [user, setuser] = useState<User>();
  const [error, seterror] = useState<any>(undefined);
  const [loading, setloading] = useState<boolean>(false);

  async function login(phone: string, password: string) {
    try {
      setloading(true);
      seterror(undefined);
      const user = (await Login(phone, password)) as User | any;
      console.log(user);

      if (user.error) {
        // alert("Error login\n" + JSON.stringify(user));
        seterror(user);
      } else {
        setuser(user);
        seterror(undefined);
      }
      setloading(false);
    } catch (e) {
      console.log(e);
      //alert("Error login\n" + JSON.stringify(e));
      setloading(false);
      seterror({ error: true, dt: JSON.stringify(e) });
    }
  }

  return !user ? (
    <FormLogin login={login} error={error} loading={loading} />
  ) : (
    <UserContext.Provider value={[user, setuser]}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
