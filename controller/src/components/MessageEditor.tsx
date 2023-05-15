import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import {useCallback, useEffect, useState} from 'react';
import Delete from '@mui/icons-material/Delete';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import {useSettingsStore} from '../store/settings';
import {supabase} from '../utils/client';

type IMessage = {
  id: number;
  content: string;
  sender?: string;
  created_at: string;
};

export default function MessageEditor() {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const usePolling = useSettingsStore((state) => state.usePolling);

  const fetchMessages = useCallback(async () => {
    const {data, error} = await supabase.from('messages').select('*').order('created_at');
    if (error) {
      console.log(error);
    } else {
      setMessages(data as IMessage[]);
    }
  }, [setMessages]);

  useEffect(() => {
    const channel = supabase
      .channel('table-db-changes')
      .on('postgres_changes', {
        event: '*',
        schema: 'public',
        table: 'messages',
      }, () => fetchMessages())
      .subscribe();
    return () => {
      channel.unsubscribe();
    };
  }, [fetchMessages]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchMessages();
    }, usePolling ? 10 * 1000 : 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchMessages, usePolling]);

  return (
    <Paper elevation={0}>
      <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
        Messages
      </Typography>
      <AddMessageForm onInsert={fetchMessages} />
      <Divider sx={{marginTop: 2, marginBottom: 2}} />
      <MessageTable messages={messages} onDelete={fetchMessages} />
    </Paper>
  );
}

function AddMessageForm({onInsert}: {onInsert: () => void}) {
  const [content, setContent] = useState<string>('');
  const [sender, setSender] = useState<string>('');
  const [posting, setPosting] = useState<boolean>(false);
  const handleInsert = async () => {
    if (!content) {
      return;
    }
    setPosting(true);
    await supabase.from('messages').insert({content, sender});
    setContent('');
    setSender('');
    setPosting(false);
    onInsert();
  };

  return (
    <Paper elevation={1} sx={{padding: 2, marginTop: 2, marginBottom: 2}}>
      <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
        Add new message
      </Typography>
      <Box sx={{display: 'flex', flexDirection: 'column', gap: 2}}>
        <Stack spacing={2} direction="row">
          <TextField label="Content" value={content} onChange={(e) => setContent(e.target.value)} fullWidth />
          <TextField label="Sender" value={sender} onChange={(e) => setSender(e.target.value)} />
        </Stack>
        <LoadingButton size="large" onClick={handleInsert} loading={posting} disabled={!content} variant="contained">Add</LoadingButton>
      </Box>
    </Paper>
  );
}

function TableRowElement({message, onDelete}: {message: IMessage; onDelete: () => void}) {
  const handleDelete = async () => {
    await supabase.from('messages').delete().eq('id', message.id);
    onDelete();
  };

  return (
    <TableRow
      sx={{'&:last-child td, &:last-child th': {border: 0}}}
    >
      <TableCell component="th" scope="row">
        {message.id}
      </TableCell>
      <TableCell>{message.content}</TableCell>
      <TableCell>{message.sender || 'None'}</TableCell>
      <TableCell align="right">{new Date(message.created_at).toLocaleString()}</TableCell>
      <TableCell align="right">
        <IconButton color="error" aria-label="upload picture" component="label" onClick={handleDelete}>
          <Delete />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

function MessageTable({messages, onDelete}: {messages: IMessage[]; onDelete: () => void}) {
  return (
    <TableContainer component={Paper}>
      <Table sx={{minWidth: 650}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Content</TableCell>
            <TableCell>Sender</TableCell>
            <TableCell align="right">Created At</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {messages.map((msg) => (
            <TableRowElement message={msg} key={msg.id} onDelete={onDelete} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
