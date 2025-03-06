import { PostgrestFilterBuilder, PostgrestBuilder } from '@supabase/postgrest-js';
import { createClient } from '@supabase/supabase-js';

export const supabase = createClient(process.env.EXPO_PUBLIC_SUPABASE_URL!, process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!)

export const handleSupabaseRequest = async (request: PostgrestFilterBuilder<any, any, any[], "pets", unknown> | PostgrestBuilder<any, false> | PromiseLike<{ data: any; error: any; }> | { data: any; error: any; }) => {
  const { data, error } = await request;

  if (error) {
    console.error("Supabase Error:", error.message);
    throw new Error(error.message);
  }

  return data;
};