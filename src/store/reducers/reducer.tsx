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

export const initialState: PokemonState = {
    pokemonsList: [],
    allPokemonsList: [],
    pokemonSelectedId: null,
    pokemonData: null,
    isLoading: true,
    isLoadMoreInprogress: false,
    pokemonsTypes: [],
    pokemonGenderList: []
  };
  
  export const reducer = (state: PokemonState, action: Action): PokemonState => {
    switch (action.type) {
      case ActionTypes.SET_POKEMON_LIST:
        return {
          ...state, pokemonsList: [...state.pokemonsList, ...(action.payload || [])]
        };
      case ActionTypes.SET_ALL_POKEMON_LIST:
        return {
          ...state, allPokemonsList: action.payload || []
        };
      case ActionTypes.SET_FILTERED_POKEMON_LIST:
        return {
          ...state, pokemonsList: action.payload || []
        };
      case ActionTypes.SET_POKEMON_TYPE:
        return {
          ...state, pokemonsTypes: action.payload || []
        };
      case ActionTypes.SET_POKEMON_GENDER_LIST:
        return {
          ...state, pokemonGenderList: action.payload || []
        };
      case ActionTypes.SET_API_CALL_INPROGRESS:
        return {
          ...state, isLoading: !!action.payload
        };
      case ActionTypes.SET_LOAD_MORE_API_CALL_INPROGRESS:
        return {
          ...state, isLoadMoreInprogress: !!action.payload
        };
      case ActionTypes.SET_POKEMON_BY_ID:
        return {
          ...state, pokemonData: action.payload || null
        };
      case ActionTypes.RESET_POKEMON_DATA:
        return {
          ...state, pokemonData: null
        };
      case ActionTypes.SET_POKEMON_ID:
        return {
          ...state, pokemonSelectedId: action.payload || null
        };
      default:
        return state;
    }
  };