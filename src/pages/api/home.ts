import { message } from 'antd';
import { GetServerSideProps } from 'next';
import { Pokemon } from '../../models/pokemon';
import { HomeResources } from '../../resources/home';

type GetPokemonsDTOItem = {
  name: string;
  url: string;
};

type GetPokemonsDTO = {
  count: number;
  next: string | null;
  previous: string | null;
  results: GetPokemonsDTOItem[];
};

export type GetPokemonsResult = {
  pokemons: Pokemon[];
  count: number;
  isError?: boolean;
};

const formattedArray = ({ url, name }: GetPokemonsDTOItem, index: number): Pokemon => ({
  id: index + 1,
  name,
});

export const getPokemons: GetServerSideProps<GetPokemonsResult> = async () => {
  try {
    // По условию задачи необходимо сразу от 1000 элементов без ленивой подгрузки
    const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');
    const { results, count }: GetPokemonsDTO = await res.json();

    const pokemons: Pokemon[] = results.map((pokemon, index, array) => {
      const result = formattedArray(pokemon, index);
      // Т.к. по условию задачи нужна структура со массивом items, проставляем вручную из-за отсутствия в выбранном API
      result.items = array.slice(index + 1, index + 11).map(formattedArray);

      return result;
    });

    return {
      props: {
        pokemons,
        count,
      },
    };
  } catch (error) {
    message.error(HomeResources.errorLoadingData);
    return {
      props: {
        isError: true,
        pokemons: [],
        count: 0,
      },
    };
  }
};
