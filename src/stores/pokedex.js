import { ref, reactive, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import axios from 'axios';
import monsterBallImage from '@/assets/images/monster-ball.png';

export const usePokedexStore = defineStore('pokedex', () => {
  const pokedex = ref([]);
  const user = reactive({});
  const isLoading = ref(false);
  const mainPokemon = ref(null);

  // 모달 상태
  const isModalVisible = ref(false);
  const selectedPokemon = ref(null);

  const route = useRoute(); // 현재 라우트 정보 가져오기
  const router = useRouter(); // 라우터 인스턴스
  const pokemon = ref({});

  const fetchUser = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users/1');

      // 전체 객체를 바꾸지 않고 내부 속성만 덮어씀
      Object.assign(user, response.data);
      console.log('📦 fetchUser 내부 response:', response.data);
      console.log('유저 정보 불러오기 성공!', user);
      console.log(
        '🧩 response.data.main_pokemon_id:',
        response.data.main_pokemon_id
      );
    } catch (e) {
      console.log('유저 정보를 불러오는 중 에러 발생:', e);
    } finally {
    }
    return;
  };

  // const updateMainPokemon = computed(() => {
  //   // 메인 포켓몬 변경 - 추후 추가
  // });

  const fetchPokedex = async () => {
    isLoading.value = true;
    try {
      const response = await axios.get('http://localhost:3001/pokedex');
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

  // 보유/미보유 포켓몬 display 처리
  const displayPokedex = computed(() => {
    const ownedIds = user.pokemon_ids || [];

    // 보유 포켓몬: 원래 정보 유지 + isOwned: true
    const owned = pokedex.value
      .filter((p) => ownedIds.includes(Number(p.id)))
      .map((p) => ({
        ...p,
        isOwned: true,
      }));

    // 미보유 포켓몬: 이름, ID, 이미지 가리기 + isOwned: false
    const notOwned = pokedex.value
      .filter((p) => !ownedIds.includes(Number(p.id)))
      .map((p) => ({
        ...p,
        id: '?',
        name: '???',
        image_url: monsterBallImage,
        isOwned: false,
      }));

    return [...owned, ...notOwned];
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
      const response = await axios.get(`http://localhost:3001/pokedex/${id}`);
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

  const openModal = async (pokemon) => {
    await fetchPokemonDetails(pokemon.id);
  };

  const closeModal = () => {
    isModalVisible.value = false;
    selectedPokemon.value = null;
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
    openModal,
    isModalVisible,
    closeModal,
    route,
    router,
  };
});
