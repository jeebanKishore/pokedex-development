import React, { useReducer, useEffect, useRef } from "react";
import { initialState, reducer } from "../../store/reducers/reducer";
import PokemonContext from "./pokmon.context";
import { allPokemonURL, initialURL } from "../../services/common.service";
import * as ACTIONS from "./../../store/actions/pokemonAction";
export const PokemonProvider: React.FC<React.PropsWithChildren<Record<string, unknown>>> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const batchURL = useRef(initialURL);

  const setAppLoading = (loading: boolean) => {
    dispatch({
      type: ACTIONS.SET_API_CALL_INPROGRESS,
      payload: loading
    });
  };

  const setLoadMoreDataInprogress = (loading: boolean) => {
    dispatch({
      type: ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS,
      payload: loading
    });
  };

  const getPokemonData = async (isReset = false) => {
    if (isReset) {
      batchURL.current = initialURL;
    }
    if (!batchURL.current) return;
    setLoadMoreDataInprogress(true);
    try {
      const resp = await fetch(batchURL.current);
      const { next, results } = await resp.json();
      batchURL.current = next;
      const pokemonsList = await getPokemonDetailsListByUrl(results);
      setPokemonList(pokemonsList);
    } catch (error) {
      console.error("Failed to fetch Pokemon data:", error);
    } finally {
      setLoadMoreDataInprogress(false);
    }
  };

  const getPokemonDetailsListByUrl = async (results: any[]) => {
    const pokemonsDetailsList = await Promise.all(
      results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        return response.json();
      })
    );
    return pokemonsDetailsList;
  };

  const getAllPokemonDataList = async () => {
    try {
      const resp = await fetch(allPokemonURL);
      const { results } = await resp.json();
      dispatch({
        type: "SET_ALL_POKEMON_LIST",
        payload: results
      });
    } catch (error) {
      console.error("Failed to fetch all Pokemon data:", error);
    }
  };

  const setPokemonList = (pokemonsList: any[]) => {
    dispatch({
      type: "SET_POKEMON_LIST",
      payload: pokemonsList
    });
  };

  useEffect(() => {
    getPokemonData().then(() => state.isLoading && setAppLoading(false));
    getAllPokemonDataList();
  }, []);

  return (
    <PokemonContext.Provider
      value={{
        state,
        dispatch,
        getPokemonData,
        getPokemonDetailsListByUrl,
        setAppLoading
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
};
