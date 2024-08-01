import { useContext, useEffect } from "react";
import { UserContext } from "../App";

export default function Logout() {
  const [user, setuser] = useContext(UserContext);

  return (
    <div>
      <div>Confirm logout?</div>
      <button
        className=" bg-red-950 rounded-md text-white p-1 text-xs   "
        onClick={(e) => setuser(undefined)}
      >
        LOGOUT
      </button>
    </div>
  );
}
