import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import {useEffect, useState} from 'react';
import {useSettingsStore} from '../store/settings';
import {supabase} from '../utils/client';

export default function TextboxEditor() {
  const textboxValue = useSettingsStore((state) => state.bottomText);
  const [text, setText] = useState<string>(textboxValue);
  const [posting, setPosting] = useState<boolean>(false);

  useEffect(() => {
    setText(textboxValue);
  }, [textboxValue]);

  const handleUpdate = async () => {
    setPosting(true);
    await supabase.from('settings').update({value: {value: text}}).eq('name', 'bottomText');
    setPosting(false);
  };

  return (
    <Box sx={{padding: 2}}>
      <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
        Bottom Box
      </Typography>
      <Paper elevation={1} sx={{padding: 2, marginTop: 2}}>

        <TextField
          multiline
          rows={4}
          value={text}
          onChange={(e) => setText(e.target.value)}
          fullWidth
          label="Bottom Box Content"
          variant="outlined"
        />
        <Box sx={{marginTop: 2, display: 'flex'}}>
          <LoadingButton sx={{flex: 1}} variant="contained" size="large" onClick={handleUpdate} loading={posting}>Update</LoadingButton>
        </Box>
      </Paper>
    </Box>
  );
}
