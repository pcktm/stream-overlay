import {useEffect, useState} from 'react';
import BottomBar from './components/BottomBar';
import BottomTextDisplay from './components/BottomTextDisplay';
import LineOpen from './components/LineOpen';
import {useSettingsStore} from './store/settings';
import {supabase} from './utils/client';

function App() {
  const handleRealtimeEvent = useSettingsStore((state) => state.handleRealtimeEvent);
  const fetchSettings = useSettingsStore((state) => state.fetchSettings);
  const usePolling = useSettingsStore((state) => state.usePolling);

  useEffect(() => {
    const channel = supabase
      .channel('table-db-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'settings',
      }, (payload) => handleRealtimeEvent(payload))
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [handleRealtimeEvent]);

  useEffect(() => {
    fetchSettings();
  }, [fetchSettings]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchSettings();
    }, usePolling ? 10 * 1000 : 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchSettings, usePolling]);

  return (
    <div className="flex flex-col min-h-screen min-w-full select-none">
      <div className="flex-1 relative flex">
        <div className="absolute right-0 bottom-0">
          <LineOpen />
        </div>
        <div className="absolute bottom-0 w-full">
          <BottomTextDisplay />
        </div>
      </div>
      <div className="flex w-full">
        <BottomBar />
      </div>
    </div>
  );
}

export default App;
