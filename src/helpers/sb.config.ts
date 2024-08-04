import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  "https://akttdrggveyretcvkjmq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFrdHRkcmdndmV5cmV0Y3Zram1xIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY0NDkxOTEsImV4cCI6MTk5MjAyNTE5MX0.TRlHZBaUdW_xbeGapzEJSgqMFiThymQqLsGGYEhRL5Q"
);

export const TABLES_NAMES = {
  USERS: "llz_users",
  PATIENTS: "llz_patients",
  MEDS: "med_",
};
