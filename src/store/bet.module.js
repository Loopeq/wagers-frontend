import { defineStore } from 'pinia'
import {computed, ref} from 'vue' 
import api from '@/services/api'
import { useAuthStore } from './auth.module'

export const useBetStore = defineStore('bet', () => {
    const sports = ref([]);
    const sportId = ref(0);
    const leagues = ref([]);
    const events = ref([]);
    const bets = ref([]);
    const rawPeriods = ref([]);
    const currentSport = computed(() => {
        return sports.value.find(sport => String(sport.id) === String(sportId.value)) || null;
    });
    const periodsBySport = computed(() => {
        if (!rawPeriods.value) return {}
        const result = {};
        rawPeriods.value.forEach(([sportId, periods]) => {
          result[sportId] = {};
          periods.forEach(([periodId, ...names]) => {
            result[sportId][periodId] = names;
          });
        });
        return result;
      });
    const betCart = ref([]);

    const authStore = useAuthStore();

    const betId2Cart = computed(() => {
        const result = {};
        betCart.value
            .filter(bet => bet && bet.bet.id) 
            .forEach(bet => {
                const key = `${bet.bet.id}_${bet.side}`;
                result[key] = bet;
            });
        return result;
    });

    const getSports = async() => {
        try {
            const response = await api.get('/public/sports');
            sports.value = response?.data
        } catch (e) {
            console.error(e);
        }
    }

    const getPeriods = async() => {
        try {
            const response = await api.get('/public/periods');
            rawPeriods.value = response?.data
        } catch (e) {
            console.error(e);
        }
    }
    
    const getLeagues = async(sportId) => {
        try {
            const response = await api.get('/public/leagues', {
                params:{
                    sport_id: sportId,
                }
            });
            leagues.value = response?.data
        } catch (e) {
            console.error(e);
        }
    }

    const getEvents = async(sportId, leagueId) => {
        try {
            const params = { sport_id: sportId }
            if (leagueId){
                params.league_id = leagueId ?? '';
            }
            const response = await api.get('/public/events', {
                params: params
            });
            events.value = response?.data
        } catch (e) {
            console.error(e);
        }
    }

    const getBets = async(matchId) => {
        try {
            const params = { match_id: matchId }
            const response = await api.get('/public/bets', {
                params: params
            });
            bets.value = response?.data
        } catch (e) {
            console.log(e);
        }
    }


    const getCart = async () => {
        if (authStore.isAuthenticated) {
          const response = await api.get('/public/cart/bets');
          betCart.value = response.data;
          return betCart.value;
        }
      };

    const addToCart = async (variant, bet) => {
        if (authStore.isAuthenticated) {
            const payload = { id: variant.id, amount: 1, side: bet.side, currency: 'USD' };
            await api.post('/public/cart/bet', payload);
            await getCart();
        } else {
            loginModal.open();
        }
    };

    const removeItemFromCart = async (betId) => {
        try{
            await api.delete('/public/cart/bet', {
                params: {
                    bet_id: betId
                }
            })
            await getCart();
        } catch (e){ 
            console.error(e);
        }
    }


    const removeCart = async () => {
        try{
            await api.delete('/public/cart')
            await getCart();
        } catch (e){ 
            console.error(e);
        }
    }

   return {
        getLeagues,
        getEvents,
        getBets,
        getPeriods,
        getSports,
        sports,
        currentSport,
        leagues,
        events,
        bets,
        sportId,
        periodsBySport,
        getCart,
        addToCart,
        betId2Cart,
        betCart,
        removeItemFromCart,
        removeCart
   }
})