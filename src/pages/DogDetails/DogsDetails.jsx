import { fetchDogs, fetchBreedDogs } from 'components/fetchApi';
import { useEffect, useState, Suspense } from 'react';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import { BackLink } from 'components/BackLink/BackLink';
import { Box, Button, Typography } from '@mui/material/';

const DogDetails = () => {
  const { dogName } = useParams();
  const [doggie, setDoggie] = useState({});
  const location = useLocation();

  // componentDidMount
  useEffect(() => {
    showDoggie(dogName);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // function to distinguish breed name from one-part and two-part names
  const showDoggie = async dogName => {
    if (dogName.includes(' ')) {
      const twoPartName = dogName.split(' ');
      const [value1, value2] = twoPartName;
      const bigDog = await fetchBreedDogs(value1, value2);
      setDoggie(bigDog);
    } else {
      const dog = await fetchDogs(dogName);
      setDoggie(dog);
    }
  };

  // go back buttton hook
  const backLinkHref = location.state?.from ?? '/';

  return (
    <Box sx={{}}>
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
      <Typography variant="h4" sx={{ py: 2, color: 'text.primary' }}>
        {dogName.toUpperCase()}
      </Typography>

      <Box
        component="img"
        sx={{
          height: 300,
          width: 300,
          borderRadius: '50%',
        }}
        src={doggie.message}
        alt={dogName}
      />

      <Typography variant="h6" sx={{ py: 2, color: 'text.primary' }}>
        Ten pies to wierny i przyjacielski czworonóg, który świetnie czuje się w
        roli rodzinnego towarzysza. Dobrze dogaduje się z dziećmi, uwielbia
        pieszczoty i wspólne zabawy. Jest łatwy w prowadzeniu, choć bywa uparty.
        Sprawdzi się zarówno w małym mieszkaniu jak i w domu z ogrodem.
      </Typography>
      <Typography variant="h6" sx={{ color: 'text.primary' }}>
        Wysokość w kłębie 30-35 cm, masa ciała 22-25 kg. Sierść krótka,
        delikatna, lśniąca, umaszczenie płowe, pręgowane lub łaciate. Charakter
        czujny, śmiały, oddany, odważny, łagodny, czasem uparty. W zależności od
        dnia pokazuje różne oblicza swojej natury.
      </Typography>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </Box>
  );
};

export default DogDetails;
