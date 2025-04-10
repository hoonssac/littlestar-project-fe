import { defineStore } from 'pinia';

export const useSignupStore = defineStore('signup', {
  state: () => ({
    username: '',
    password: '',
    last_answered_date: null,
    pokemon_ids: [],
    main_pokemon_id: null,
    question_ids: [],
    mileage: 0,
    ticket_count: 0,
  }),
});
