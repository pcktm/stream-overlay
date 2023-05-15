import create from 'zustand';
import {supabase} from '../utils/client';

interface SettingsState {
  linesOpen: boolean;
  bottomText: string;
  usePolling: boolean;
  useSnowfall: boolean;
  showTeddy: boolean;
  handleRealtimeEvent: (payload: any) => void;
  fetchSettings: () => Promise<void>;
}

export const useSettingsStore = create<SettingsState>((set) => ({
  linesOpen: false,
  bottomText: '',
  usePolling: false,
  useSnowfall: false,
  showTeddy: false,

  handleRealtimeEvent: (payload) => {
    console.debug('realtime event', payload);
    if (!(payload.eventType === 'INSERT' || payload.eventType === 'UPDATE')) {
      console.log('Realtime event not an INSERT or an UPDATE', payload);
      return;
    }
    if (!payload.new || !payload.new?.value?.value === undefined) {
      console.error('Invalid realtime payload', payload);
      return;
    }
    if (payload.new.name === 'linesOpen') {
      set({linesOpen: payload.new.value.value === true});
    }
    if (payload.new.name === 'bottomText' && typeof payload.new.value.value === 'string') {
      set({bottomText: payload.new.value.value ?? ''});
    }
    if (payload.new.name === 'usePolling') {
      set({usePolling: payload.new.value.value === true});
    }
    if (payload.new.name === 'useSnowfall') {
      set({useSnowfall: payload.new.value.value === true});
    }
    if (payload.new.name === 'showTeddy') {
      set({showTeddy: payload.new.value.value === true});
    }
  },
  fetchSettings: async () => {
    const {data, error} = await supabase
      .from('settings')
      .select('name, value');
    if (error) {
      console.error('Error fetching settings', error);
      return;
    }
    if (data) {
      console.log('Fetched settings', data);
      const linesOpen = data.find((setting) => setting.name === 'linesOpen');
      const bottomText = data.find((setting) => setting.name === 'bottomText');
      const usePolling = data.find((setting) => setting.name === 'usePolling');
      const useSnowfall = data.find((setting) => setting.name === 'useSnowfall');
      const showTeddy = data.find((setting) => setting.name === 'showTeddy');
      set({
        linesOpen: linesOpen?.value?.value === true,
        bottomText: bottomText?.value?.value ?? '',
        usePolling: usePolling?.value?.value === true,
        useSnowfall: useSnowfall?.value?.value === true,
        showTeddy: showTeddy?.value?.value === true,
      });
    }
  },
}));
