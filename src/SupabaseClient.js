import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://jntnivyzbdfwwoqldtnw.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpudG5pdnl6YmRmd3dvcWxkdG53Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTg1NTQ0MDIsImV4cCI6MjA3NDEzMDQwMn0.fT0oEAEG8bbjq12HoIV8N-c_pQcyBQM-whLKEusZ0S0";
export const supabase = createClient(supabaseUrl, supabaseKey);
