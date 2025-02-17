import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PokemonState {
  selectedPokemons: string[];
}

const initialState: PokemonState = {
  selectedPokemons: [],
};

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState,
  reducers: {
    selectPokemon: (state, action: PayloadAction<string>) => {
      state.selectedPokemons.push(action.payload);
    },
    unselectPokemon: (state, action) => {
      state.selectedPokemons = state.selectedPokemons.filter(
        (id) => id !== action.payload
      );
    },
    unselectAllPokemons: (state) => {
      state.selectedPokemons = [];
    },
  },
});

export const { selectPokemon, unselectPokemon, unselectAllPokemons } =
  pokemonSlice.actions;
export default pokemonSlice.reducer;
