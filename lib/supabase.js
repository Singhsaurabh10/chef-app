import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://dhhngxojpwzdvxgxmybs.supabase.co";

// Get the CORRECT key:
// Supabase dashboard → Settings → API → "anon" "public" key
// It must start with "eyJ" — that's a JWT token
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRoaG5neG9qcHd6ZHZ4Z3hteWJzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYxMTA2OTAsImV4cCI6MjA5MTY4NjY5MH0.2kNUciJL43ZR9MQhBpSa9A3iqfsxt56dSKNE-zocxw8";

export const supabase = createClient(supabaseUrl, supabaseKey);
