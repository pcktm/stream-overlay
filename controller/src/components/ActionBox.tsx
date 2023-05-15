import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton'; import {useEffect, useState} from 'react';
import {supabase, effectsChannel, popupChannel} from '../utils/client';
import {useSettingsStore} from '../store/settings';

export default function ActionBox() {
  return (
    <Box sx={{padding: 2}}>
      <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
        Actions
      </Typography>
      <Paper elevation={0} sx={{marginTop: 2}}>
        <Stack direction="column" spacing={2}>
          <PostConfettiButton />
          <PostPopupBox />
        </Stack>
      </Paper>
    </Box>
  );
}

function PostPopupBox() {
  const [text, setText] = useState('');

  const handlePostPopup = async () => {
    const trimmedText = text.trim();
    if (!trimmedText) {
      return;
    }
    await popupChannel.send({type: 'broadcast', event: 'popup', text: trimmedText});
    setText('');
  };

  return (
    <Paper elevation={3} sx={{padding: 2}}>
      <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
        Popup
      </Typography>
      <Box sx={{marginTop: 2}}>
        <Stack direction="column" spacing={2}>
          <TextField
            sx={{flex: 1}}
            label="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <LoadingButton
            sx={{flex: 1}}
            variant="contained"
            size="large"
            onClick={handlePostPopup}
            disabled={!text}
          >
            Post Popup
          </LoadingButton>
        </Stack>
      </Box>
    </Paper>
  );
}

function PostConfettiButton() {
  const handlePostConfetti = async () => {
    await effectsChannel.send({type: 'broadcast', event: 'confetti'});
  };
  return (
    <Paper elevation={3} sx={{padding: 2}}>
      <LoadingButton
        sx={{flex: 0}}
        variant="contained"
        size="large"
        onClick={handlePostConfetti}
      >
        Trigger Confetti
      </LoadingButton>
    </Paper>
  );
}
