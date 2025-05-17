import { useAuthStore } from '@/stores/authStore';
import axios from 'axios';

const BASEURI = '/api/auth';

const signup = async (user) => {
  try {
    const response = await axios.post(`${BASEURI}/signup`, user, {
      withCredentials: true, // 세션 쿠키를 보내기 위해 필요
    });

    const authStore = useAuthStore();
    authStore.login(response.data); // 서버에서 회원가입 후 로그인 상태 유지
    return response.data;
  } catch (err) {
    console.log('회원가입 실패:', err);
    throw err;
  }
};

const login = async (username, password) => {
  try {
    const response = await axios.post(
      `${BASEURI}/login`,
      { username, password },
      { withCredentials: true } // 세션 쿠키 사용
    );

    const authStore = useAuthStore();
    authStore.login(response.data);
    return response.data;
  } catch (err) {
    console.log('로그인 실패:', err);
    return null;
  }
};

const logout = async () => {
  try {
    await axios.post(`${BASEURI}/logout`, null, {
      withCredentials: true,
    });

    const authStore = useAuthStore();
    authStore.logout();
  } catch (err) {
    console.log('로그아웃 실패:', err);
  }
};

// const getUserInfo = async () => {
//   try {
//     const response = await axios.get('/api/users/me', {
//       withCredentials: true,
//     });

//     const authStore = useAuthStore();
//     authStore.login(response.data);
//     return response.data;
//   } catch (err) {
//     console.log('유저 정보 가져오기 실패:', err);
//     return null;
//   }
// };

const getUserInfo = async () => {
  try {
    const response = await axios.get('/api/auth/me', {
      withCredentials: true, // 세션 쿠키 전달
    });
    return response.data;
  } catch (err) {
    console.error('유저 정보 가져오기 실패:', err);
    return null;
  }
};

const isUsernameTaken = async (username) => {
  try {
    const response = await axios.get(
      `/api/auth/check-username?username=${username}`
    );
    return response.data.exists; // 백엔드에서 boolean 값을 리턴한다고 가정
  } catch (err) {
    console.error('아이디 중복 확인 실패:', err);
    return false;
  }
};

export { signup, login, logout, getUserInfo, isUsernameTaken };
