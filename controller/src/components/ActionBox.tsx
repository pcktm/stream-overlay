import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton'; import {useEffect, useState} from 'react';
import {supabase, effectsChannel} from '../utils/client';
import {useSettingsStore} from '../store/settings';

export default function ActionBox() {
  return (
    <Box sx={{padding: 2}}>
      <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
        Actions
      </Typography>
      <Paper elevation={1} sx={{padding: 2, marginTop: 2}}>
        <Stack direction="row" spacing={2}>
          <PostConfettiButton />
        </Stack>
      </Paper>
    </Box>
  );
}

function PostConfettiButton() {
  const handlePostConfetti = async () => {
    await effectsChannel.send({type: 'broadcast', event: 'confetti'});
  };
  return (
    <LoadingButton
      sx={{flex: 1}}
      variant="contained"
      size="large"
      onClick={handlePostConfetti}
    >
      Trigger Confetti
    </LoadingButton>
  );
}
