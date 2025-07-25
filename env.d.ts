declare namespace NodeJS {
  interface ProcessEnv {
    AUTH_SECRET: string;
    AUTH_GOOGLE_ID: string;
    AUTH_GOOGLE_SECRET: string;

    NEXT_PUBLIC_SUPABASE_URL: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY: string;

    SUPABASE_JWT_SECRET: string;

    SUPABASE_SERVICE_ROLE_KEY: string;
  }
}
