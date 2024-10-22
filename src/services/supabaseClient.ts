
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://oaexqtoklkknexstqlrb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9hZXhxdG9rbGtrbmV4c3RxbHJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1NTE0NzMsImV4cCI6MjA0NTEyNzQ3M30.c5_-Pw81mHTMhfxbcUW-YwJtjUzaK2zjRihE-99RIA4'
export const supabase = createClient(supabaseUrl, supabaseKey)
