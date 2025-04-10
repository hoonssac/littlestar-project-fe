import { ref, reactive, computed, toRefs, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { defineStore } from 'pinia';
import axios from 'axios';
import monsterBallImage from '@/assets/images/monster-ball.png';

export const usePokedexStore = defineStore('pokedex', () => {
  const pokedex = ref([]);
  const user = reactive({});
  const isLoading = ref(false);
  const mainPokemon = ref(null);
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

  const fetchUser = async () => {
    try {
      const response = await axios.get('/api/users/1');

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

    // 기존 포켓몬 데이터 순서를 유지하면서 보유 여부 추가
    return pokedex.value.map((p) => {
      const isOwned = ownedIds.includes(Number(p.id));

      return isOwned
        ? { ...p, isOwned: true } // 보유한 포켓몬은 원래 데이터 유지
        : {
            id: '?', // 미보유 포켓몬은 ID 숨김
            name: '???', // 이름 숨김
            image_url: monsterBallImage, // 포켓볼 이미지 적용
            isOwned: false, // 미보유 상태 추가
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

    if (!user || !user.pokemon_ids) {
      console.log('❌ 유저 정보 없음 → false 반환');
      return false;
    }

    const result = user.pokemon_ids.includes(Number(pokemonId)); // 🔥 숫자로 변환하여 비교
    console.log('✅ 보유 여부:', result);
    return result;
  };

  const setMainPokemon = async (pokemonId) => {
    if (!isOwnedPokemon(pokemonId)) {
      alert('미지의 포켓몬은 대표 포켓몬으로 설정할 수 없어요!');
      return;
    }
    const numericPokemonId = Number(pokemonId);
    try {
      await axios.patch(`/api/users/1`, {
        main_pokemon_id: numericPokemonId,
      });

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

  // 가챠 관련 요소 시작

  // 포켓몬 뽑기 실행
  const drawPokemon = async () => {
    console.log('뽑기 직전 pokedex: ', pokedex);
    if (user.mileage < 5000) {
      alert(`마일리지가 부족해요! 필요한 마일리지: ${5000 - user.mileage}`);
      return;
    }

    // 보유하지 않은 포켓몬 리스트
    const notOwnedPokemon = pokedex.value.filter(
      (p) => !user.pokemon_ids.includes(p.id)
    );

    if (notOwnedPokemon.length === 0) {
      alert('모든 포켓몬을 보유하고 있어요!');
      return;
    }

    // 랜덤으로 포켓몬 하나 선택
    const randomIndex = Math.floor(Math.random() * notOwnedPokemon.length);
    const newPokemon = notOwnedPokemon[randomIndex];

    // 유저 정보 업데이트 (포켓몬 추가, 마일리지 차감)
    user.pokemon_ids.push(Number(newPokemon.id));
    user.mileage -= 5000;

    // 서버에 업데이트
    try {
      await axios.patch(`/api/users/1`, {
        pokemon_ids: user.pokemon_ids,
        mileage: user.mileage,
      });
      isModalVisible.value = true;
      console.log(`🎉 ${newPokemon.name} 획득!`);
      return newPokemon;
    } catch (e) {
      console.error('포켓몬 뽑기 실패:', e);
      return null;
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
      }, 2000);
    } else {
      isModalVisible.value = false; // 뽑기 실패 시 모달 닫기
    }
  };

  const progressDegree = computed(() => {
    console.log('🟡 progressDegree 실행됨!', user.mileage); 
    const maxMileage = 5000;
    return Math.min(((user.mileage % maxMileage) / maxMileage) * 100, 100);
  });

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
    drawPokemon,
    handleGacha,
    isDrawing,
    progressDegree,
  };
});
