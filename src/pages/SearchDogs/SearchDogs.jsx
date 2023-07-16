import { useEffect, useState, Suspense, useRef } from 'react';
import { fetchDogs, fetchBreedDogs } from 'components/fetchApi';
import { Outlet, useSearchParams, useLocation } from 'react-router-dom';
import Notiflix from 'notiflix';
import { BackLink } from 'components/BackLink/BackLink';
import { Box, TextField, Button, Typography } from '@mui/material/';

function SearchDogs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doggie, setDoggie] = useState({});
  const location = useLocation();

  const isMounted = useRef(false);
  const search = searchParams.get('value') ?? '';
  const adjustedSearch = search.trim().toLowerCase();

  // componentDidUpdate
  useEffect(() => {
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    showDoggie(adjustedSearch);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [adjustedSearch]);

  // function to distinguish breed name from one-part and two-part names
  const showDoggie = async dogName => {
    if (dogName.includes(' ')) {
      const twoPartName = dogName.split(' ');
      const [value1, value2] = twoPartName;
      const bigDog = await fetchBreedDogs(value1, value2);
      if (bigDog.status === 'error') {
        Notiflix.Notify.failure('There is no such breed of dog');
      }

      setDoggie(bigDog);
    } else {
      const dog = await fetchDogs(adjustedSearch);

      if (dog.status === 'error') {
        Notiflix.Notify.failure('There is no such breed of dog');
      }
      setDoggie(dog);
    }
  };

  //  Search event handler
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const value = e.target[0].value;
    setSearchParams({ value: value });
    if (value === '') {
      return Notiflix.Notify.warning('Please enter dog breed to continue');
    }
    form.reset();
  };

  // Loader
  if (!doggie) {
    return 'Loading';
  }

  // go back button hook
  const backLinkHref = location.state?.from ?? '/searchDogs';

  if (search === '' || doggie.status === 'error') {
    return (
      <Box sx={{ height: 820 }}>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            id="outlined-textarea"
            label="Enter breed of a dog"
            placeholder="Example: bulldog french"
            sx={{
              width: 300,
              height: 'auto',
              borderColor: 'white',
            }}
          />
          <Button
            variant="contained"
            type="submit"
            sx={{
              bgcolor: 'background.secondary',
              color: 'text.secondary',
              fontWeight: 600,
              my: 1,
              mx: 2,
              ':hover': {
                bgcolor: 'background.third',
                color: 'text.primary',
              },
            }}
          >
            Find
          </Button>
        </Box>
      </Box>
    );
  } else if (doggie.status === 'success') {
    return (
      <Box sx={{ height: 824 }}>
        <Box sx={{ display: 'flex', justifyContent: 'left' }}>
          <BackLink to={backLinkHref}>
            <Button
              variant="contained"
              type="button"
              sx={{
                bgcolor: 'background.secondary',
                color: 'text.secondary',
                fontWeight: 600,
                my: 1,
                mx: 2,
                ':hover': {
                  bgcolor: 'background.third',
                  color: 'text.primary',
                },
              }}
            >
              Go Back
            </Button>
          </BackLink>
        </Box>
        <Typography variant="h2" sx={{ py: 2, color: 'text.primary' }}>
          {adjustedSearch.toUpperCase()}
        </Typography>
        <Box
          component="img"
          sx={{
            height: 350,
            width: 350,
            borderRadius: '50%',
          }}
          src={doggie.message}
          alt={adjustedSearch}
        />
        <Typography variant="h6" sx={{ py: 2, color: 'text.primary' }}>
          Ten pies to wierny i przyjacielski czworonóg, który świetnie czuje się
          w roli rodzinnego towarzysza. Dobrze dogaduje się z dziećmi, uwielbia
          pieszczoty i wspólne zabawy. Jest łatwy w prowadzeniu, choć bywa
          uparty. Sprawdzi się zarówno w małym mieszkaniu jak i w domu z
          ogrodem.
        </Typography>
        <Typography variant="h6" sx={{ color: 'text.primary' }}>
          Wysokość w kłębie 30-35 cm, masa ciała 22-25 kg. Sierść krótka,
          delikatna, lśniąca, umaszczenie płowe, pręgowane lub łaciate.
          Charakter czujny, śmiały, oddany, odważny, łagodny, czasem uparty. W
          zależności od dnia pokazuje różne oblicza swojej natury.
        </Typography>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
        <Outlet />
      </Box>
    );
  }
}

export default SearchDogs;
