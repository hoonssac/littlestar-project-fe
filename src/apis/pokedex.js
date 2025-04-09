import { default as axios } from 'axios';

const BASEURI = '/api/pokedex';

const getAllPokedex = async () => {
  try {
    const response = await axios.get(BASEURI);
    return response.data;
  } catch (err) {
    console.log('pokedex get 에러!!', err);
  }
};

const getPokedex = async (id) => {
  try {
    const response = await axios.get(`${BASEURI}/${id}`);
    return response.data;
  } catch (err) {
    console.log('pokedex get 에러!!', err);
  }
};

export { getAllPokedex, getPokedex };
