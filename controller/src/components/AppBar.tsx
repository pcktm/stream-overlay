import MAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import {supabase} from '../utils/client';

export default function AppBar() {
  return (
    <Box sx={{flexGrow: 1}}>
      <MAppBar position="static">
        <Toolbar>
          <Box sx={{flexGrow: 1}}>
            <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
              JuweOverlay Remote
            </Typography>
            <Typography
              variant="caption"
              component="div"
            >
              by
              {' '}
              <Link color="inherit" href="https://kopanko.com" target="_blank">Jakub</Link>
            </Typography>
          </Box>
        </Toolbar>
      </MAppBar>
    </Box>
  );
}
