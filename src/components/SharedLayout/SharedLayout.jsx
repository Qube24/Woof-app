import { Outlet, NavLink } from 'react-router-dom';
import { Suspense } from 'react';
import { Box, Button } from '@mui/material';

const SharedLayout = () => {
  return (
    <Box
      sx={{
        p: 3,
        maxHeight: 'auto',
      }}
    >
      <Box
        sx={{
          py: 2,
          maxHeight: 'auto',
          borderBottom: '2px solid black',
          display: 'flex',
          alignItems: 'left',

          gap: 5,
        }}
      >
        <Button
          variant="contained"
          sx={{
            bgcolor: 'background.secondary',
            color: 'text.secondary',
            fontWeight: 600,
            ':hover': {
              bgcolor: 'background.third',
              color: 'text.primary',
            },
            ':active': {
              bgcolor: 'background.secondary',
              color: 'text.secondary',
            },
            ':focus': {
              bgcolor: 'background.secondary',
              color: 'text.secondary',
            },
          }}
          component={NavLink}
          to="/"
        >
          Home
        </Button>
        <Button
          variant="contained"
          sx={{
            bgcolor: 'background.secondary',
            color: 'text.secondary',
            fontWeight: 600,
            ':hover': {
              bgcolor: 'background.third',
              color: 'text.primary',
            },
            ':active': {
              bgcolor: 'background.secondary',
              color: 'text.secondary',
            },
          }}
          component={NavLink}
          to="/searchDogs"
        >
          Search
        </Button>
      </Box>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Box>
  );
};

export default SharedLayout;
