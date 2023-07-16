import { Routes, Route } from 'react-router-dom';
import { lazy } from 'react';
import SharedLayout from './ShearedLayout/SharedLayout';

const Home = lazy(() => import('../pages/Home/Home'));
const SearchDogs = lazy(() => import('../pages/SearchDogs/SearchDogs'));
const DogsDetails = lazy(() => import('../pages/DogDetails/DogsDetails'));

export const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/searchDogs" element={<SearchDogs />} />
          <Route path="/dog/:dogName" element={<DogsDetails />} />
        </Route>
      </Routes>
    </div>
  );
};
