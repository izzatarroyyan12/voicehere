import { createClient } from '@supabase/supabase-js';
const supabaseClient = createClient(
  process.env.SUPABASE_URL,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5ib3VxeGxwY250b3Rva2FzcG5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY2NDQzODYsImV4cCI6MjAzMjIyMDM4Nn0.U6A2fgmg8pOUpvfABxogMvSir2RncuyOWyoaEuOuR1Y',
);

export default supabaseClient;
