/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_KEY: process.env.SUPABASE_KEY,
    API_ENDPOINT_URL: process.env.API_ENDPOINT_URL,
  },
};

export default nextConfig;
