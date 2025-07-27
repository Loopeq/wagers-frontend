import { defineStore } from 'pinia'
import {ref, computed} from 'vue' 
import api from '@/services/api'

export const useBetStore = defineStore('bet', () => {
    const events = ref([]);
    const onPaginationFlag = ref(0);
    const page = ref(1);
    const eventsCount = ref([]);
    const event = ref({});
    const eventChanges = ref([]);
    const eventComparison = ref([]);
    const eventHistory = ref({});
    const eventResult = ref([]);
    const eventPeriods = ref([]);
    const selectedEventId = ref(null);
    const eventsCountMap = computed(() => {
        return eventsCount?.value.reduce((acc, item) => {
            acc[item.sport_id] = item.count;
            return acc
        }, {});
    })
    const sports = ref([]);
    const relatedParams = ref({
        sport_id: 29,
        league_id: null,
        hours: null,
        finished: false,
        nulls: false,
        sort_by: 'last_change',
        sort_order: 'desc',
    })
    const relatedParamsViewMode = ref('all');

    const getSports = async() => {
        try {
            const response = await api.get('/sports');
            sports.value = response?.data
        } catch (e) {
            console.error(e);
        }
    }

    const getRelated = async (params, expand) => {
        try {
            const response = await api.getWithQuery('/related', {
                ...params
            })
            if (expand) {
                events.value = [...events.value, ...response?.data.matches];
              } else {
                events.value = response?.data.matches;
              }
              eventsCount.value = response?.data.match_counts;
        } 
        catch (e){
            console.error(e);
        }
    }

    const getStraight = async (params) => {
        try {
            const response = await api.getWithQuery('/straight', {
                ...params
            })
            event.value = response?.data.match;
            eventChanges.value = response?.data.changes;
            eventResult.value = response?.data.match_results;
            eventComparison.value = response?.data.comparison;
            eventPeriods.value = response?.data.periods;
        } catch (e){
            console.log(e);
        }
    }

    const getHistory = async (params) => {
        try {
            const response = await api.getWithQuery('/statistic/history', {
                ...params
            })
            eventHistory.value = response.data;
        } catch (e){
            console.log(e);
        }
    }
    return {
        getRelated,
        getStraight,
        getSports,
        getHistory,
        onPaginationFlag,
        page,
        selectedEventId,
        relatedParams,
        relatedParamsViewMode,
        events,
        event,
        eventChanges,
        eventComparison,
        eventHistory,
        eventPeriods,
        eventResult,
        eventsCountMap,
        sports,
    }
})