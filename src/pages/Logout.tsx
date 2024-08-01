import { useContext } from "react";
import { UserContext } from "../App";

export default function Logout() {
  const [_, setuser] = useContext(UserContext);

  return (
    <div>
      <div>Confirm logout?</div>
      <button
        className=" bg-red-950 rounded-md text-white p-1 text-xs   "
        onClick={(_) => setuser(undefined)}
      >
        LOGOUT
      </button>
    </div>
  );
}
