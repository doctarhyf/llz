import { TABLES_NAMES } from "../helpers/sb.config";
import supabase from "./sb.config";

export async function Login(phone: string, password: string) {
  const user = await supabase
    .from(TABLES_NAMES.USERS)
    .select("*")
    .eq("phone", phone)
    .eq("password", password);

  console.log("user => ", user);
}

export async function InsertItem(tableName: string, newData: unknown) {
  const { data, error } = await supabase
    .from(tableName)
    .insert(newData)
    .select()
    .single();

  if (data) return data;

  return { error: true, ...error };
}

export async function LoadAllItems(tableName: string) {
  const { data, error } = await supabase
    .from(tableName)
    .select("*")
    .order("created_at", { ascending: false });

  if (data) return data;

  return { error: true, ...error };
}

export async function DeleteItem(table_name: string, item_data: any) {
  const { error } = await supabase
    .from(table_name)
    .delete()
    .eq("id", item_data.id);

  return error;
}

export async function UpdateItem(table_name: string, upd_data: any) {
  const { data, error } = await supabase
    .from(table_name)
    .update(upd_data)
    .eq("id", upd_data.id)
    .select()
    .single();

  if (data) return data;
  return { error: true, ...error };
}
