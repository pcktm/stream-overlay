import {useEffect, useState} from 'react';
import {Box} from '@mui/material';
import {useSettingsStore} from './store/settings';
import {supabase} from './utils/client';
import AppBar from './components/AppBar';
import TextboxEditor from './components/TextboxEditor';
import MessageEditor from './components/MessageEditor';
import ActionBox from './components/ActionBox';

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
    <div>
      <AppBar />
      <Box sx={{padding: 2}}>
        <ActionBox />
      </Box>
      <Box sx={{padding: 2}}>
        <TextboxEditor />
      </Box>
      <Box sx={{padding: 2}}>
        <MessageEditor />
      </Box>
    </div>
  );
}

export default App;
