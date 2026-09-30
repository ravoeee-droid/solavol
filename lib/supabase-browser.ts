import { createClient } from '@supabase/supabase-js';

const url = 'https://dessavbytgxyygeohjrn.supabase.co';
const publishableKey = 'sb_publishable_B_ZVkMMl_t73o3CsKRr8Nw_HK47IQXl';

export const supabase = createClient(url, publishableKey);
