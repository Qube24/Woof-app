// fetch dogs list by breed for home

export const fetchDogsList = async () => {
  const res = await fetch('https://dog.ceo/api/breeds/list/all');
  const dogsJson = await res.json();
  return dogsJson;
};

// fetch function to search for dogs with one-part name

export const fetchDogs = async value => {
  if (value === '') {
    return;
  } else {
    const res = await fetch(`https://dog.ceo/api/breed/${value}/images/random`);
    const searchDogsJson = await res.json();
    return searchDogsJson;
  }
};

// fetch function to search for dogs with two-part name

export const fetchBreedDogs = async (value1, value2) => {
  const res = await fetch(
    `https://dog.ceo/api/breed/${value1}/${value2}/images/random`
  );
  const searchDogsBreedJson = await res.json();
  return searchDogsBreedJson;
};
