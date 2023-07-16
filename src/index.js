import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from 'components/App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { Box, ThemeProvider, createTheme, Container } from '@mui/material/';

const theme = createTheme({
  palette: {
    background: {
      primary: '#1F1D2B',
      secondary: '#EFBA54',
      third: '#1e88e5',
    },
    text: {
      primary: '#E6E6E6',
      secondary: '#616069',
    },
  },
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/woof-app">
      <ThemeProvider theme={theme}>
        <Container
          maxWidth="false"
          disableGutters={true}
          sx={{ bgcolor: 'background.primary', maxHeight: 'auto' }}
        >
          <Box
            sx={{
              textAlign: 'center',
            }}
          >
            <App />
          </Box>
        </Container>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
