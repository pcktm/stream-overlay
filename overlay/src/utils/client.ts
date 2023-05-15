import {createClient} from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const effectsChannel = supabase.channel('effects', {
  config: {
    broadcast: {ack: true},
  },
});

export const popupChannel = supabase.channel('popup', {
  config: {
    broadcast: {ack: true},
  },
});

try {
  effectsChannel.subscribe((payload) => {
    console.log('effectsChannel', payload);
  });
  popupChannel.subscribe((payload) => {
    console.log('popupChannel', payload);
  });
} catch (error) {
  console.error(error);
}
