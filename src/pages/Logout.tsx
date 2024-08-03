import { useContext } from "react";
import { UserContext } from "../App";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Logout() {
  const [_, setuser] = useContext(UserContext);
  const navigate = useNavigate();
  const [, , removeCookie] = useCookies(["llz_user"]);

  return (
    <div>
      <div>Confirm logout?</div>
      <button
        className=" bg-red-950 rounded-md text-white p-1 text-xs   "
        onClick={(_) => {
          setuser(undefined);
          navigate("/");
          removeCookie("llz_user");
        }}
      >
        LOGOUT
      </button>
    </div>
  );
}
