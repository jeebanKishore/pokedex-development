/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";
import { initialState } from "../../store/reducers/reducer";

const PokemonContext = createContext({
  state: initialState,
  dispatch: () => null,
  getPokemonData: () => Promise.resolve(),
  getPokemonDetailsListByUrl: () => Promise.resolve([]),
  setAppLoading: () => {}
});

export default PokemonContext;

