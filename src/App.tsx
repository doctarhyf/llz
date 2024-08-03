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
  const [cookies, setCookie, removeCookie] = useCookies(["llz_user"]);
  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

  useEffect(() => {
    // console.log(cookies);
    const ck = Object.entries(cookies);

    if (ck.length > 0) {
      const u = cookies.llz_user;

      if (u) {
        setuser(u);
      }
    }

    console.log(setMousePosition);

    const handleMouseMove = (event: MouseEvent) => {
      console.log(event);
      //const mp = { x: event.clientX, y: event.clientY };
      removeCookie("llz_user");
      setCookie("llz_user", JSON.stringify(user), {
        expires: GetLaterDate("i", 5),
      });
      /*
      setMousePosition(mp);
      console.log(mp); */
    };

    // Attach the event listener
    window.addEventListener("mousemove", handleMouseMove);

    console.log(mousePosition);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
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

  if (user)
    return (
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

  return <FormLogin login={login} error={error} loading={loading} />;
}

export default App;
