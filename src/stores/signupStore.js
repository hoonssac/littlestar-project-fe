import { defineStore } from 'pinia';

export const useSignupStore = defineStore('signup', {
  state: () => ({
    username: '',
    password: '',
    age: '',
    lastAnsweredDate: null,
    pokemonIds: [],
    mainPokemonId: null,
    question_ids: [],
    mileage: 0,
    ticket_count: 0,
  }),
});
