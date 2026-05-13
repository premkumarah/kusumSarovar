import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://wvozroftubryginpzxac.supabase.co/rest/v1/";
const supabaseAnonKey = "sb_publishable_QTXD9BPs2iY4bIYCMFWWjg_qNoQjq1W";

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);