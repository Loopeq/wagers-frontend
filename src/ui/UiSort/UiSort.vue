<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import UiSelect from '../UiSelect/UiSelect.vue';

const emit = defineEmits([
  'update:modelValueSortId',
  'update:modelValueOrderId'
]);

const props = defineProps({
    modelValueSortId: Number,
    modelValueOrderId: Number,
    items: Array,
    orders: Array,
})

const internalModelSort = computed({
  get() {
    return props.modelValueSortId;
  },
  set(value) {
    emit('update:modelValueSortId', value);
  }
});

const internalModelOrder = computed({
  get() {
    return props.modelValueOrderId;
  },
  set(value) {
    emit('update:modelValueOrderId', value);
  }
});

</script>

<template>
    <div class="ui-sort">
        <UiSelect v-model="internalModelSort" :items="items" label="Сортировка"/>
        <UiSelect v-model="internalModelOrder" :items="orders" label="Порядок"/>
    </div>
</template>

<style scoped lang="scss">
.ui-sort{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 10px;
}
</style>