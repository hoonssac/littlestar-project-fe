import { useAuthStore } from '@/stores/authStore';
import { default as axios } from 'axios';

const BASEURI = '/api/users';

const signup = async (user) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.post(BASEURI, user);

    if (response.data) {
      const user = response.data;
      authStore.login(user);
      return response.data;
    }

    return response.data;
  } catch (err) {
    console.log('users post 에러!!', err);
  }
};

const login = async (username, password) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.get(
      `${BASEURI}?username=${username}&password=${password}`
    );

    if (response.data && response.data.length) {
      const user = response.data[0];
      authStore.login(user);
      return response.data[0];
    }
    return null;
  } catch (err) {
    console.log('users get 에러!!', err);
  }
};

const getUserInfo = async (id) => {
  const authStore = useAuthStore();
  try {
    const response = await axios.get(`${BASEURI}/${id}`);

    if (response.data) {
      const user = response.data;
      authStore.login(user);
      return response.data;
    }

    return response.data;
  } catch (err) {
    console.log('users get 에러!!', err);
  }
};

export { signup, login, getUserInfo };
