import { defineStore } from 'pinia';

export const useSignupStore = defineStore('signup', {
  state: () => ({
    username: '',
    password: '',
    age: '',
    lastAnsweredDate: null,
    pokemonIds: [],
    mainPokemonId: null,
    mileage: 0,
  }),
});
