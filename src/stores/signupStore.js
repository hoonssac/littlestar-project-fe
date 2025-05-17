import { defineStore } from 'pinia';

export const useSignupStore = defineStore('signup', {
  state: () => ({
    username: '',
    password: '',
    age: '',
    lastAnsweredDate: null,
    mainPokemonId: null,
    mileage: 0,
  }),
});
