interface PokemonState {
    pokemonsList: any[]; // Replace `any` with a more specific type if available
    allPokemonsList: any[];
    pokemonSelectedId: number | null;
    pokemonData: any; // Replace with a more specific type if available
    isLoading: boolean;
    isLoadMoreInprogress: boolean;
    pokemonsTypes: any[]; // Replace with a more specific type if available
    pokemonGenderList: any[]; // Replace with a more specific type if available
  }
  
  // Action Types
  interface Action<T = any> {
    type: ActionTypes;
    payload?: T;
  }
  
  // Enum for Action Types
  enum ActionTypes {
    SET_POKEMON_LIST = 'ACTIONS.SET_POKEMON_LIST',
    SET_ALL_POKEMON_LIST = 'ACTIONS.SET_ALL_POKEMON_LIST',
    SET_FILTERED_POKEMON_LIST = 'ACTIONS.SET_FILTERED_POKEMON_LIST',
    SET_POKEMON_TYPE = 'ACTIONS.SET_POKEMON_TYPE',
    SET_POKEMON_GENDER_LIST = 'ACTIONS.SET_POKEMON_GENDER_LIST',
    SET_API_CALL_INPROGRESS = 'ACTIONS.SET_API_CALL_INPROGRESS',
    SET_LOAD_MORE_API_CALL_INPROGRESS = 'ACTIONS.SET_LOAD_MORE_API_CALL_INPROGRESS',
    SET_POKEMON_BY_ID = 'ACTIONS.SET_POKEMON_BY_ID',
    RESET_POKEMON_DATA = 'ACTIONS.RESET_POKEMON_DATA',
    SET_POKEMON_ID = 'ACTIONS.SET_POKEMON_ID'
  }