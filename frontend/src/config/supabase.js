import { createClient } from '@supabase/supabase-js';

const supabaseClient = createClient(
  'https://nbouqxlpcntotokaspnc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ib3VxeGxwY250b3Rva2FzcG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTQ4NzQ0NTAsImV4cCI6MjAzMDQ1MDQ1MH0.WBsbjNQGSmVgeMCaY9vft8tje6lx7rBWHw5QDVxi2ik',
);

export default supabaseClient;
