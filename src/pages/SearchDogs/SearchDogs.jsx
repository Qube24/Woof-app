import { useEffect, useState, Suspense, useRef } from 'react';
import { fetchDogs, fetchBreedDogs } from 'components/fetchApi';
import { Outlet, useSearchParams, useLocation } from 'react-router-dom';
import Notiflix from 'notiflix';
import { BackLink } from 'components/BackLink/BackLink';
import css from './SearchDogsStyle.module.css';

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
      console.log(bigDog);
      setDoggie(bigDog);
    } else {
      const dog = await fetchDogs(adjustedSearch);
      setDoggie(dog);
    }
  };

  //  Seatch event handler
  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    setSearchParams({ value: form.elements.searchInput.value });
    form.reset();
  };

  // Loader
  if (!doggie) {
    return 'Loading';
  }

  // go back buttton hook
  const backLinkHref = location.state?.from ?? '/searchDogs';

  if (doggie.status === 'error') {
    Notiflix.Notify.failure('Qui timide rogat docet negare');
    return (
      <div>
        <form onSubmit={handleSubmit} className={css.form}>
          <input
            type="text"
            name="searchInput"
            className={css.searchBar}
            placeholder="example: bulldog"
          />
          <button type="submit" className={css.searchBtn}>
            Search
          </button>
        </form>
      </div>
    );
  } else if (doggie.status === 'success') {
    return (
      <div>
        <div className={css.container}>
          <BackLink to={backLinkHref}>
            <button type="button" className={css.backBtn}>
              Go Back
            </button>
          </BackLink>

          <h1>{adjustedSearch}</h1>

          <img
            src={doggie.message}
            alt={adjustedSearch}
            className={css.poster}
          />

          <p className={css.infoText}>
            Ten pies to wierny i przyjacielski czworonóg, który świetnie czuje
            się w roli rodzinnego towarzysza. Dobrze dogaduje się z dziećmi,
            uwielbia pieszczoty i wspólne zabawy. Jest łatwy w prowadzeniu, choć
            bywa uparty. Sprawdzi się zarówno w małym mieszkaniu jak i w domu z
            ogrodem.
          </p>
          <p className={css.infoText}>
            Wysokość w kłębie 30-35 cm, masa ciała 22-25 kg. Sierść krótka,
            delikatna, lśniąca, umaszczenie płowe, pręgowane lub łaciate.
            Charakter czujny, śmiały, oddany, odważny, łagodny, czasem uparty. W
            zależności od dnia pokazuje różne oblicza swojej natury.
          </p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
        <Outlet />
      </div>
    );
  }
}

export default SearchDogs;
