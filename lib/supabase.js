import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dhhngxojpwzdvxgxmybs.supabase.co";
const supabaseKey = "sb_publishable_gB9urWdkZWSBl9wPqppauA_81cME38K";

export const supabase = createClient(supabaseUrl, supabaseKey);