import { FC, memo, useCallback, useContext, useState } from 'react';
import { Pokemon } from '../../models/pokemon';
import { List } from 'antd';
import { AppContext } from '../../store/AppContext';
import { MainListItem } from './MainListItem';
import { addHistoryItem, setFavoriteList, setLoadingList, setMainList } from '../../store/actions';
import { sortPokemons } from '../../helpers/sortPokemons';
import { HistoryTypes } from '../../store/types';

const MainList: FC = memo(() => {
  const {
    state: { favoritesList, mainList, mainListFilters, loadingList },
    dispatch,
  } = useContext(AppContext);

  const handleMoveToFavorites = useCallback(
    (pokemonID: number) => {
      dispatch(setLoadingList(true));
      // Хак для отображения лоадера, при обработке большого кол-ва данных
      setTimeout(() => {
        const { sortType, searchValue } = mainListFilters;
        const selectedPokemon = mainList.findIndex((pokemon) => pokemon.id === pokemonID);
        const removedPokemon = [...mainList].splice(selectedPokemon, 1)[0];

        const newMainList = mainList.filter((pokemon) => pokemon.id !== pokemonID);
        dispatch(setMainList(newMainList));

        let newFavoritesList = [...favoritesList, removedPokemon];

        if (searchValue && sortType) {
          newFavoritesList = sortPokemons(newFavoritesList, searchValue, sortType);
        } else {
          newFavoritesList = newFavoritesList.sort((a, b) => a.id - b.id);
        }

        dispatch(setFavoriteList(newFavoritesList));
        dispatch(setLoadingList(false));
        dispatch(addHistoryItem({ type: HistoryTypes.ADDED, element: removedPokemon }));
      }, 0);
    },
    [mainList, favoritesList, mainListFilters],
  );

  const handleRenderListFavoriteItem = useCallback(
    (pokemon: Pokemon) => (
      <MainListItem key={pokemon.id} pokemon={pokemon} onMoveToFavorite={handleMoveToFavorites} />
    ),
    [handleMoveToFavorites],
  );

  return (
    <List
      loading={loadingList}
      bordered
      dataSource={mainList}
      renderItem={handleRenderListFavoriteItem}
    />
  );
});

MainList.displayName = 'MainList';
export { MainList };
