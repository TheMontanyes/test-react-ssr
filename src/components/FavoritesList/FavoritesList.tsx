import { Pokemon } from '../../models/pokemon';
import { List } from 'antd';
import { FC, memo, useCallback, useContext, useState } from 'react';
import { FavoritesListItem } from './FavoritesListItem';
import { sortPokemons } from '../../helpers/sortPokemons';
import { addHistoryItem, setFavoriteList, setLoadingList, setMainList } from '../../store/actions';
import { HistoryTypes } from '../../store/types';
import { AppContext } from '../../store/AppContext';

const FavoritesList: FC = memo(() => {
  const {
    state: { favoritesList, mainList, mainListFilters, loadingList },
    dispatch,
  } = useContext(AppContext);

  const handleDeleteFromFavorites = useCallback(
    (pokemonID: number) => {
      dispatch(setLoadingList(true));
      // Хак для отображения лоадера, при обработке большого кол-ва данных
      setTimeout(() => {
        const { searchValue, sortType } = mainListFilters;
        const selectedPokemon = favoritesList.findIndex((pokemon) => pokemon.id === pokemonID);
        const removedPokemon = [...favoritesList].splice(selectedPokemon, 1)[0];

        const newFavoritesList = favoritesList.filter((pokemon) => pokemon.id !== pokemonID);
        dispatch(setFavoriteList(newFavoritesList));

        let newMainList = [...mainList, removedPokemon];

        if (searchValue && sortType) {
          newMainList = sortPokemons(newMainList, searchValue, sortType);
        } else {
          newMainList = newMainList.sort((a, b) => a.id - b.id);
        }

        dispatch(setMainList(newMainList));
        dispatch(setLoadingList(false));
        dispatch(addHistoryItem({ type: HistoryTypes.DELETED, element: removedPokemon }));
      }, 0);
    },
    [favoritesList, mainList, mainListFilters],
  );

  const handleRenderListFavoriteItem = useCallback(
    (pokemon: Pokemon) => (
      <FavoritesListItem key={pokemon.id} pokemon={pokemon} onDelete={handleDeleteFromFavorites} />
    ),
    [handleDeleteFromFavorites],
  );

  return (
    <List
      loading={loadingList}
      bordered
      dataSource={favoritesList}
      renderItem={handleRenderListFavoriteItem}
    />
  );
});

FavoritesList.displayName = 'FavoritesList';
export { FavoritesList };
