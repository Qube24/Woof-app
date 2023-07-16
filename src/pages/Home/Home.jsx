import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { fetchDogsList } from 'components/fetchApi';
import { Box, Typography, List, ListItem } from '@mui/material/';

function Home() {
  // hook for setting list of dogs by breed
  const [dogsListBreed, setDogsListBreed] = useState([]);

  // componentDidMount
  useEffect(() => {
    // function for fetching list of dogs by breed
    const fetchDogsListBreed = async () => {
      const fetchDogsListBreed = await fetchDogsList();
      setDogsListBreed(fetchDogsListBreed.message);
    };
    fetchDogsListBreed();
  }, []);

  // variable for changing object to array
  const ArrayOfDogs = Object.keys(dogsListBreed);

  // function to combine keys with values
  const fullDataDogs = ArrayOfDogs.flatMap(dog =>
    dogsListBreed[dog].length > 0
      ? dogsListBreed[dog].map(value => `${dog} ${value}`)
      : dog
  );

  return (
    <div>
      <Typography variant="h3" sx={{ my: 2, color: 'text.primary' }}>
        BREED LIST
      </Typography>
      <Box sx={{ textAlign: 'left' }}>
        <List
          sx={{
            display: 'inline-block',
            textAlign: 'left',
          }}
        >
          {fullDataDogs.map((el, index) => (
            <ListItem
              key={index}
              sx={{ my: 1, fontSize: 30, textDecoration: 'none' }}
            >
              <Link
                to={`/dog/${el}`}
                key={index}
                style={{ textDecoration: 'none' }}
              >
                <Typography
                  variant="BUTTON"
                  sx={{
                    color: 'text.primary',
                    ':hover': {
                      color: 'text.secondary',
                    },
                  }}
                >
                  {el.toUpperCase()}
                </Typography>
              </Link>
            </ListItem>
          ))}
        </List>
      </Box>
      <Outlet />
    </div>
  );
}

export default Home;
