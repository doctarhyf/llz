/* 
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg"; */
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";

import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import { createContext, useEffect, useState } from "react";
import FormLogin from "./comps/forms/FormLogin";
import { Login } from "./helpers/sb";
import Logout from "./pages/Logout";
import { TUser } from "./helpers/types";
import Pharmacie from "./pages/Pharmacie";
import Finances from "./pages/Finances";
import Patients from "./pages/Patients";
import { useCookies } from "react-cookie";
import { GetLaterDate } from "./helpers/funcs";

export const UserContext = createContext<any>(undefined);

function App() {
  const [user, setuser] = useState<TUser>();
  const [error, seterror] = useState<any>(undefined);
  const [loading, setloading] = useState<boolean>(false);
  const [cookies, setCookie] = useCookies(["llz_user"]);

  useEffect(() => {
    console.log(cookies);
    const ck = Object.entries(cookies);

    if (ck.length > 0) {
      const u = cookies.llz_user;

      if (u) {
        setuser(u);
      }
    }
  }, []);

  async function login(phone: string, password: string) {
    try {
      setloading(true);
      seterror(undefined);
      const user = (await Login(phone, password)) as TUser | any;
      console.log(user);

      if (user.error) {
        // alert("Error login\n" + JSON.stringify(user));
        seterror(user);
      } else {
        setuser(user);
        seterror(undefined);
        setCookie("llz_user", JSON.stringify(user), {
          expires: GetLaterDate("i", 5),
        });
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
            <Route path="patients" element={<Patients />} />
            <Route path="pharmacie" element={<Pharmacie />} />
            <Route path="finances" element={<Finances />} />
            <Route path="logout" element={<Logout />} />
            <Route path="*" element={<NoPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
