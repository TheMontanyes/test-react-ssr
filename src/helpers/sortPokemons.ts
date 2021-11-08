import { Pokemon } from '../models/pokemon';
import { SortDirectionsTypes } from '../components/Filters';

type HashMap = { [id: string]: number };

const sortPokemons = (pokemons: Pokemon[], searchValue: string, sortType: SortDirectionsTypes) => {
  let findedPokemons = [...pokemons];
  // Хеш-карта кол-ва вхождения строки в найденных элементах

  let hashMap: HashMap = {};
  if (searchValue) {
    hashMap = findedPokemons.reduce((acc: HashMap, pokemon) => {
      const hasInParent = pokemon.name.includes(searchValue);
      const countInNestedPokemons =
        pokemon.items?.reduce(
          (prev, next) => (next.name.includes(searchValue) ? prev + 1 : prev),
          0,
        ) ?? 0;

      acc[pokemon.id] = hasInParent ? 1 + countInNestedPokemons : countInNestedPokemons;
      return acc;
    }, hashMap);
  }

  // Сортировка
  if (sortType === SortDirectionsTypes.ASC) {
    findedPokemons = findedPokemons.sort((a, b) => {
      const baseSubtraction = a.id - b.id;
      return searchValue ? hashMap[a.id] - hashMap[b.id] + baseSubtraction : baseSubtraction;
    });
  } else {
    findedPokemons = findedPokemons.sort((a, b) => {
      const baseSubtraction = b.id - a.id;
      return searchValue ? hashMap[b.id] - hashMap[a.id] + baseSubtraction : baseSubtraction;
    });
  }

  return findedPokemons;
};

export { sortPokemons };
