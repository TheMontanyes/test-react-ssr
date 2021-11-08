import type { NextPage } from 'next';
import { getPokemons, GetPokemonsResult } from './api/home';
import { Col, Divider, Row } from 'antd';
import { Pokemon } from '../models/pokemon';
import { HomeResources } from '../resources/home';
import { useCallback, useContext, useEffect } from 'react';
import { Filters, SortDirectionsTypes } from '../components/Filters';
import { sortPokemons } from '../helpers/sortPokemons';
import { AppContext } from '../store/AppContext';
import { setFilters, setLoadingList, setMainList } from '../store/actions';
import { FavoritesList } from '../components/FavoritesList';
import { MainList } from '../components/MainList';

interface HomeProps extends GetPokemonsResult {}

const { titleFavoriteList, titleMainList } = HomeResources;

const Home: NextPage<HomeProps> = ({ pokemons = [] }) => {
  const {
    state: { favoritesList, mainList },
    dispatch,
  } = useContext(AppContext);

  const handleSearchPokemons = useCallback(
    (searchValue: string, sortType: SortDirectionsTypes) => {
      dispatch(setLoadingList(true));
      setTimeout(() => {
        let findedPokemons: Pokemon[];
        if (searchValue) {
          findedPokemons = pokemons.filter(
            (pokemon) =>
              (pokemon.name.toLowerCase().includes(searchValue) ||
                pokemon.items?.some((pokemon) =>
                  pokemon.name.toLowerCase().includes(searchValue),
                )) &&
              !favoritesList.map(({ id }) => id).includes(pokemon.id),
          );

          findedPokemons = sortPokemons(findedPokemons, searchValue, sortType);
        } else {
          findedPokemons = sortPokemons(pokemons, searchValue, sortType);
        }

        dispatch(setMainList(findedPokemons));
        dispatch(setFilters({ sortType, searchValue }));
        dispatch(setLoadingList(false));
      }, 0);
    },
    [pokemons, favoritesList],
  );

  useEffect(() => {
    if (!mainList.length) {
      dispatch(setMainList(pokemons));
    }
  }, []);

  return (
    <Row justify='space-around'>
      <Col span={10}>
        <Divider orientation='left'>{titleMainList}</Divider>
        <Filters onSearch={handleSearchPokemons} />
        <Divider />
        <MainList />
      </Col>
      <Col span={10}>
        <Divider orientation='left'>{titleFavoriteList}</Divider>
        <FavoritesList />
      </Col>
    </Row>
  );
};

export const getServerSideProps = getPokemons;

export default Home;
