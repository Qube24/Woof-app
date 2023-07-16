import css from './movieDetalisStyle.module.css';
import { fetchDogs, fetchBreedDogs } from 'components/fetchApi';
import { useEffect, useState, Suspense } from 'react';
import { useParams, Outlet, useLocation } from 'react-router-dom';
import { BackLink } from 'components/BackLink/BackLink';
import { Notiflix } from 'notiflix';

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
    <div className={css.container}>
      <BackLink to={backLinkHref}>
        <button type="button" className={css.backBtn}>
          Go Back
        </button>
      </BackLink>

      <h1>{dogName}</h1>

      <img src={doggie.message} alt={dogName} className={css.poster} />

      <p className={css.infoText}>
        Ten pies to wierny i przyjacielski czworonóg, który świetnie czuje się w
        roli rodzinnego towarzysza. Dobrze dogaduje się z dziećmi, uwielbia
        pieszczoty i wspólne zabawy. Jest łatwy w prowadzeniu, choć bywa uparty.
        Sprawdzi się zarówno w małym mieszkaniu jak i w domu z ogrodem.
      </p>
      <p className={css.infoText}>
        Wysokość w kłębie 30-35 cm, masa ciała 22-25 kg. Sierść krótka,
        delikatna, lśniąca, umaszczenie płowe, pręgowane lub łaciate. Charakter
        czujny, śmiały, oddany, odważny, łagodny, czasem uparty. W zależności od
        dnia pokazuje różne oblicza swojej natury.
      </p>
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default DogDetails;
