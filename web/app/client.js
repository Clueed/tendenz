
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://jhczrepcnfchcqqjrkis.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpoY3pyZXBjbmZjaGNxcWpya2lzIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODk5MjkyMDMsImV4cCI6MjAwNTUwNTIwM30.oNRvLJyFBzqwcOLbBOGsmQ_CkjY2Ou5o6r2NpdrnRNM"
export const supabase = createClient(supabaseUrl, supabaseKey)


