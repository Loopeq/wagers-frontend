import { defineStore } from 'pinia'
import {computed, ref} from 'vue' 
import api from '@/services/api'

export const useBetStore = defineStore('bet', () => {
    const sports = ref([]);
    const sportId = ref(0);
    const leagues = ref([]);
    const events = ref([]);
    const bets = ref([]);
    const event = ref({});
    const betCart = ref([]);

    const betId2Cart = computed(() => {
        const result = {};
        betCart.value.forEach(bet => {
            const { bet_id, side, ...rest } = bet;
            const key = `${bet_id}_${side}`;
            result[key] = rest;
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

    const getEvents = async(leagueId, sportId) => {
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
            console.error(e);
        }
    }

    const postBet2Cart = async(betId, amount, side) => {
        const payload = {bet_id: betId, amount: amount, side: side}
        const response = await api.post('/betting/cart/bet', payload);
        return response
    }

    const getUserCart = async() => {
        const response = await api.get('/betting/cart/bets');
        betCart.value = response.data;
        return response
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
        postBet2Cart,
        getUserCart,
        betId2Cart,
   }
})