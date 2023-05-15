import {useEffect, useState} from 'react';
import {Box, Divider, Stack} from '@mui/material';
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
        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={0}
        >
          <Box flex={1}>
            <ActionBox />
          </Box>
          <Divider orientation="vertical" flexItem sx={{marginY: 3}} />
          <Box flex={1}>
            <TextboxEditor />
          </Box>
        </Stack>

        <Divider sx={{marginY: 2, marginX: 10}} />

        <Box sx={{paddingX: 2}}>
          <MessageEditor />
        </Box>
      </Box>
    </div>
  );
}

export default App;
