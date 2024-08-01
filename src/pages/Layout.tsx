import { Outlet, Link, useLocation } from "react-router-dom";
import Logo from "../comps/Logo";
import { useState } from "react";

const LINKS = [
  { to: "/", title: "Home" },
  { to: "/about", title: "About" },
  { to: "/support", title: "Support" },
  { space: true },
  { to: "/logout", title: "Logout" },
];

const Layout = () => {
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  function toggleMenu() {
    setShowMenu(!showMenu);
  }

  return (
    <div className=" sm:flex  ">
      <nav className=" shadow-md  ">
        <ul className={` h-fit   sm:h-[100vh]  bg-sky-500  `}>
          <button className=" w-full p-1  " onClick={toggleMenu}>
            <Logo small dark iconOnly={!showMenu} />
          </button>

          <div
            className={` transition-all ease-in-out duration-75  ${
              showMenu ? "hidden" : "block"
            }  `}
          >
            {LINKS.map((lk, i) =>
              lk.space ? (
                <li key={i} className=" flex-grow  "></li>
              ) : (
                <li key={i}>
                  <Link
                    className={` w-full   ${
                      location.pathname === lk.to
                        ? " bg-white text-sky-500"
                        : ""
                    }  px-4 py-1 inline-block hover:bg-white/40    `}
                    to={lk.to as string}
                  >
                    {lk.title}
                  </Link>
                </li>
              )
            )}
          </div>
        </ul>
      </nav>

      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
