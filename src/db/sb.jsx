import { TABLE_NAMES } from "./consts";
import { supabase } from "./sb.config";

export async function Login(phone, password) {
  const user = await supabase
    .from(TABLE_NAMES.USERS)
    .select("*")
    .eq(phone)
    .eq(password);

  console.log("user => ", user);
}
