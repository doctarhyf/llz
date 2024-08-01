import { Outlet, Link, useLocation } from "react-router-dom";
import Logo from "../comps/Logo";

const LINKS = [
  { to: "/", title: "Home" },
  { to: "/about", title: "About" },
  { to: "/support", title: "Support" },
  { space: true },
  { to: "/logout", title: "Logout" },
];

const Layout = () => {
  const location = useLocation();

  return (
    <div className="flex">
      <nav>
        <ul className=" flex flex-col bg-gradient-to-b from-sky-500 to-sky-400  w-fit h-[100vh]  ">
          <Logo small dark />
          {LINKS.map((lk, i) =>
            lk.space ? (
              <li key={i} className=" flex-grow "></li>
            ) : (
              <li key={i}>
                <Link
                  className={` w-full   ${
                    location.pathname === lk.to ? "bg-black text-sky-500" : ""
                  }   p-2 inline-block hover:bg-black/40    `}
                  to={lk.to as string}
                >
                  {lk.title}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>

      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
