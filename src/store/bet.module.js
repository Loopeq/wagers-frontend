import { defineStore } from 'pinia'
import {computed, ref} from 'vue' 
import api from '@/services/api'
import { useAuthBettingStore } from './authBetting.module'
import { useLoginModal } from '@/use/useLoginModal'

export const useBetStore = defineStore('bet', () => {
    const sports = ref([]);
    const sportId = ref(0);
    const leagues = ref([]);
    const events = ref([]);
    const bets = ref([]);
    const event = ref({});
    const betCart = ref([]);
    const loginModal = useLoginModal();
    let betWs = null;

    const authStore = useAuthBettingStore();

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
            const response = await api.get('/betting/sports');
            sports.value = response?.data
        } catch (e) {
            console.error(e);
        }
    }
    
    const getLeagues = async(sportId) => {
        try {
            const response = await api.get('/betting/leagues', {
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
            const response = await api.get('/betting/events', {
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
            const response = await api.get('/betting/bets', {
                params: params
            });
            bets.value = response?.data.bets
            event.value = response?.data.event
        } catch (e) {
            console.log(e);
        }
    }


    const getCart = async () => {
        if (authStore.isAuthenticated) {
          const response = await api.get('/betting/cart/bets');
          betCart.value = response.data;
          return betCart.value;
        }
      };

    const addToCart = async (variant, bet) => {
        if (authStore.isAuthenticated) {
            const payload = { id: variant.id, amount: 1, side: bet.side, currency: 'USD' };
            await api.post('/betting/cart/bet', payload);
            await getCart();
        } else {
            loginModal.open();
        }
    };

    const removeItemFromCart = async (betId) => {
        try{
            await api.delete('/betting/cart/bet', {
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
            await api.delete('/betting/cart')
            await getCart();
        } catch (e){ 
            console.error(e);
        }
    }

   return {
        getLeagues,
        getEvents,
        getBets,
        getSports,
        sports,
        leagues,
        events,
        bets,
        event,
        sportId,
        getCart,
        addToCart,
        betId2Cart,
        betCart,
        removeItemFromCart,
        removeCart
   }
})