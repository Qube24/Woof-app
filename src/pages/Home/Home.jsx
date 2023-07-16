import { useEffect, useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { fetchDogsList } from 'components/fetchApi';
import css from './homeStyle.module.css';

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
      <h2 className={css.pageTitle}>Breed Lists</h2>
      <ul className={css.list}>
        {fullDataDogs.map((el, index) => (
          <Link to={`/dog/${el}`} key={index}>
            <li key={index} className={css.link}>
              {el}
            </li>
          </Link>
        ))}
      </ul>
      <Outlet />
    </div>
  );
}

export default Home;
