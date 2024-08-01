import { Outlet, Link, useLocation } from "react-router-dom";

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
    <>
      <nav>
        <ul className=" flex flex-col  md:flex-row  bg-sky-800  ">
          {LINKS.map((lk, i) =>
            lk.space ? (
              <li key={i} className=" flex-grow "></li>
            ) : (
              <li key={i}>
                <Link
                  className={` w-full md:w-fit  ${
                    location.pathname === lk.to ? "bg-sky-500" : ""
                  }   p-2 inline-block hover:bg-white/20   `}
                  to={lk.to as string}
                >
                  {lk.title}
                </Link>
              </li>
            )
          )}
        </ul>
      </nav>

      <Outlet />
    </>
  );
};

export default Layout;
