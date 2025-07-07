import { ref, reactive, computed, watch, nextTick } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import axios from 'axios';
import monsterBallImage from '@/assets/images/monster-ball.png';
import { useAuthStore } from './authStore';
import { getUserInfo } from '@/apis/users';
import TeamRocketAlert from '@/components/common/TeamRocketAlert.vue';
import SelectSound from '@/assets/sounds/GetMileage.mp3';

export const usePokedexStore = defineStore('pokedex', () => {
  const pokedex = ref([]);
  const user = reactive({});
  const isLoading = ref(false);
  const mainPokemon = ref(null);
  const authStore = useAuthStore();
  const userMileage = ref(0);

  // 마일리지
  // const { mileage } = toRefs(user);
  // const progressDegree = ref(0);

  // `watch()`를 사용해 `mileage`가 변경될 때마다 progress 업데이트
  // watch(
  //   mileage,
  //   (newMileage) => {
  //     console.log('🟡 mileage 변경 감지됨!', newMileage);
  //     const maxMileage = 5000;
  //     progressDegree.value = Math.min(
  //       ((newMileage % maxMileage) / maxMileage) * 100,
  //       100
  //     );
  //   },
  //   { immediate: true }
  // ); // 🚀 컴포넌트가 마운트될 때도 한 번 실행!

  // 모달 상태
  const isModalVisible = ref(false);
  const isDrawing = ref(false); // 뽑기 중 상태 추가
  const selectedPokemon = ref(null);

  const route = useRoute(); // 현재 라우트 정보 가져오기
  const router = useRouter(); // 라우터 인스턴스
  const pokemon = ref({});

  // 로켓단 alert
  const isAlertVisible = ref(false);
  const alertMessage = ref('');

  function playClickSound() {
    const audio = new Audio(SelectSound);
    audio.volume = 0.6;
    audio.play().catch((err) => {
      console.warn('효과음 재생 실패:', err);
    });
  }

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/auth/me', {
        withCredentials: true,
      });

      const data = response.data;

      // 반응형 객체에 하나씩 대입
      user.id = data.id;
      user.username = data.username;
      user.age = data.age;
      user.pokemon_ids = data.pokemon_ids;
      user.main_pokemon_id = data.main_pokemon_id;
      user.mileage = data.mileage;
      user.ticketCount = data.ticket_count;

      console.log('✅ 세션 기반 사용자 정보 불러옴:', user);
    } catch (e) {
      console.log('❌ 유저 정보 가져오기 실패:', e);
    }
  };

  const fetchPokedex = async () => {
    isLoading.value = true;
    try {
      const response = await axios.get('/api/pokedex');
      if (response.status === 200) {
        pokedex.value = response.data;
        console.log('도감 불러오기 성공!', pokedex.value);
      } else {
        console.warn(
          '도감을 불러오는 데 실패했어요. 상태 코드:',
          response.status
        );
      }
    } catch (e) {
      console.log('포켓몬 도감을 가져오는 데에 실패했어요.', e);
    } finally {
      // calculateMainPokemon();
      isLoading.value = false;
    }
    return;
  };

  const displayPokedex = computed(() => {
    const ownedIds = user.pokemon_ids || [];

    return pokedex.value.map((p) => {
      const isOwned = ownedIds.includes(Number(p.id));

      return {
        ...p,
        isOwned,
        name: isOwned ? p.name : '???',
        image_url: isOwned ? p.image_url : monsterBallImage,
      };
    });
  });

  const calculateMainPokemon = () => {
    console.log('✅ calculateMainPokemon 실행');
    const mainId = Number(user.main_pokemon_id);
    console.log('🧪 main_pokemon_id:', mainId);
    console.log(pokedex.value.length);

    if (!mainId || pokedex.value.length === 0) {
      console.log('❌ 조건 미충족, mainPokemon은 null');
      mainPokemon.value = null;
      return;
    }

    const found = pokedex.value.find((p) => Number(p.id) === mainId); // ✅ 수정
    mainPokemon.value = found || null;
    console.log('✅ mainPokemon 설정됨:', mainPokemon.value);
  };

  // 디테일 모달창 관련 코드 시작

  // 포켓몬 디테일 가져오기
  const fetchPokemonDetails = async (id) => {
    try {
      const response = await axios.get(`/api/pokedex/${id}`);
      if (response.status === 200) {
        selectedPokemon.value = response.data; // 선택한 포켓몬 정보를 업데이트
        isModalVisible.value = true; // 모달 열기
        console.log('📜 포켓몬 상세 정보:', response.data);
      } else {
        console.warn('포켓몬 상세 정보를 불러오지 못했어요.');
      }
    } catch (e) {
      console.error('포켓몬 정보를 가져오는 데 실패했습니다:', e);
    }
  };

  const isOwnedPokemon = (pokemonId) => {
    console.log('🛠 isOwnedPokemon 호출됨!');
    console.log('🔍 user.pokemon_ids:', user.pokemon_ids);
    console.log('🔍 pokemonId 타입:', typeof pokemonId, '값:', pokemonId);

    if (!user || !user.pokemon_ids || pokemonId == undefined) {
      console.log('false 반환');
      return false;
    }

    const result = user.pokemon_ids.includes(Number(pokemonId)); // 🔥 숫자로 변환하여 비교
    console.log('✅ 보유 여부:', result);
    return result;
  };

  const setMainPokemon = async (pokemonId) => {
    console.log('보유 미보유?', isOwnedPokemon(pokemonId));
    if (isOwnedPokemon(pokemonId) == false) {
      console.log('alert창 떠야댐');
      showAlert(`미지의 포켓몬은\n대표 포켓몬으로 설정할 수 없다옹!`);
      return;
    }
    const numericPokemonId = Number(pokemonId);
    try {
      await axios.patch(
        '/api/users/main-pokemon',
        {
          mainPokemonId: numericPokemonId,
        },
        {
          withCredentials: true, // ✅ 세션 쿠키 전송 필수!
        }
      );

      user.main_pokemon_id = pokemonId; // 상태 업데이트
      calculateMainPokemon(); // 대표 포켓몬 다시 계산
      console.log(`🎉 대표 포켓몬이 No.${pokemonId}으로 변경되었습니다!`);
      closeModal();
    } catch (e) {
      console.error('대표 포켓몬 설정 중 오류 발생:', e);
    }
    return {
      setMainPokemon,
    };
  };

  const openModal = async (pokemon) => {
    await fetchPokemonDetails(pokemon.id);
  };

  const closeModal = () => {
    isModalVisible.value = false;
    selectedPokemon.value = null;
  };

  const closeGachaModal = () => {
    isModalVisible.value = false;

    // ✅ 다른 페이지로 이동 후 다시 가챠 페이지로 이동 (라우터 트릭 사용)
    router.replace('/temp'); // 1️⃣ 임시 페이지로 이동
    setTimeout(() => {
      router.replace('/gacha'); // 2️⃣ 다시 가챠 페이지로 이동 (리렌더링 유도)
    }, 30); // 🔹 50ms 정도 텀을 주면 Vue가 정상적으로 감지함
  };

  // 가챠 함수 시작

  // 포켓몬 뽑기 실행
  const drawPokemon = async () => {
    console.log('뽑기 직전 pokedex: ', pokedex);
    if (user.mileage < 5000) {
      showAlert(`${5000 - user.mileage}마일리지가 더 필요하다옹!`);
      return;
    }

    // 보유하지 않은 포켓몬 리스트
    const notOwnedPokemon = pokedex.value.filter(
      (p) => !user.pokemon_ids.includes(p.id)
    );

    if (notOwnedPokemon.length === 0) {
      showAlert('모든 포켓몬을 보유하고 있어요!');
      return;
    }

    // 랜덤으로 포켓몬 하나 선택
    const randomIndex = Math.floor(Math.random() * notOwnedPokemon.length);
    const newPokemon = notOwnedPokemon[randomIndex];

    // 유저 정보 업데이트 (포켓몬 추가, 마일리지 차감)
    user.pokemon_ids.push(Number(newPokemon.id));
    user.mileage -= 5000;
    console.log('🔴 마일리지 차감 완료, 현재 마일리지:', user.mileage);
    console.log('🧐 authStore 상태:', authStore);
    // ✅ 새로운 객체로 user 업데이트 (Vue가 변경 감지 가능하도록)
    authStore.user = { ...authStore.user, mileage: user.mileage };
    console.log('🔴 authStore.user 업데이트 완료!:', user.mileage);

    // userMileage.value = user.mileage;
    // console.log('🔄 즉시 반영된 마일리지:', userMileage.value);
    // ✅ fetchMileageData를 먼저 호출하여 프로그래스 바 즉시 반영

    // ✅ nextTick() 사용해서 렌더링 보장
    await nextTick();
    console.log('🟢 nextTick 이후 ProgressBar 강제 업데이트됨!');
    fetchMileageData();
    updateProgressBar();

    // 서버에 업데이트
    try {
      await axios.post('/api/users/gatcha', {
        newPokemonId: newPokemon.id,
      });
      isModalVisible.value = true;
      console.log(`🎉 ${newPokemon.name} 획득!`);
      updateProgressBar();
      return newPokemon;
    } catch (e) {
      console.error('포켓몬 뽑기 실패:', e);
      return null;
    } finally {
      await fetchUser();
      await fetchMileageData();
    }
  };

  const handleGacha = async () => {
    isDrawing.value = true; // 뽑기 중 상태 활성화
    selectedPokemon.value = null; // 초기화
    isModalVisible.value = true; // 모달 표시

    const newPokemon = await drawPokemon();

    if (newPokemon) {
      setTimeout(() => {
        selectedPokemon.value = newPokemon; // 2초 후 결과 표시
        isDrawing.value = false; // 뽑기 완료
        playClickSound();
      }, 2000);
    } else {
      isModalVisible.value = false; // 뽑기 실패 시 모달 닫기
    }
  };

  const fetchMileageData = async () => {
    const fetchUser = async () => {
      if (authStore.user) {
        await getUserInfo(authStore.user.id);
      }
    };
    await fetchUser();

    if (authStore.user) {
      userMileage.value = authStore.user.mileage;
      console.log('fetchMileageData 실행됨, userMileage: ', userMileage.value);
    }
  };

  // // ✅ ProgressBar 적용할 값 계산 (0~100%)
  // const userMileageDegree = computed(() => {
  //   return authStore.user && authStore.user.mileage !== undefined
  //     ? Math.min((userMileage.value / 5000) * 100, 100)
  //     : 0.5; // ✅ 안전한 기본값 설정
  // });

  const userMileageDegree = ref(0); // ✅ 초기값 0
  // ✅ authStore.user가 변경될 때 콘솔 확인
  watch(
    () => authStore.user,
    (newUser) => {
      if (newUser) {
        console.log('🟢 유저 정보 업데이트됨!', newUser);
        console.log('🔄 최신 userMileageDegree:', userMileageDegree.value);
      }
    },
    { immediate: true } // ⭐ `immediate: true`로 처음에도 실행되도록 함
  );

  // Progress Bar 강제 리렌더링을 위한 key
  const progressBarKey = ref(0);

  watch(
    () => authStore.user?.mileage,
    (newMileage) => {
      if (newMileage !== undefined) {
        userMileageDegree.value = Math.min((newMileage / 5000) * 100, 100);
        console.log(
          '🔄 ProgressBar 업데이트됨! 최신 마일리지:',
          userMileageDegree.value
        );
      }
    },
    { immediate: true }
  );

  const updateProgressBar = () => {
    userMileage.value = authStore.user.mileage;
    userMileageDegree.value = Math.min((userMileage.value / 5000) * 100, 100);
    console.log(
      '🔄 ProgressBar 강제 업데이트! 최신 마일리지:',
      userMileage.value
    );
  };

  // 로켓단 alert

  const showAlert = (message) => {
    console.log('🚨 showAlert 실행됨! 메시지:', message);
    alertMessage.value = message;
    isAlertVisible.value = true;
    console.log(isAlertVisible.value);

    // 3초 후 자동으로 알림 닫기
    setTimeout(() => {
      isAlertVisible.value = false;
    }, 3000);
  };

  const backToPokedex = () => {
    router.replace('/pokedex');
  };

  return {
    user,
    pokedex,
    isLoading,
    fetchUser,
    fetchPokedex,
    mainPokemon,
    calculateMainPokemon,
    displayPokedex,
    selectedPokemon,
    fetchPokemonDetails,
    isOwnedPokemon,
    setMainPokemon,
    openModal,
    isModalVisible,
    closeModal,
    closeGachaModal,
    drawPokemon,
    handleGacha,
    isDrawing,
    userMileageDegree,
    fetchMileageData,
    isAlertVisible,
    alertMessage,
    backToPokedex,
  };
});
