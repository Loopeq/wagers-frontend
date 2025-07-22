<script setup>
import { defineProps, onMounted, onUnmounted, ref, computed, defineEmits } from 'vue';

const emit = defineEmits(['update:modelValue', 'update:isSelectVisible'])

const props = defineProps({
    modelValue: Number,
    items: Array,
    label: String,
    isSelectVisible: Boolean,
})

const consistantItems = computed(() => {
    return props.items.filter((val) => val.id !== props.modelValue);
})
const selectedItem = computed(() => {
    return props.items?.find((val) => val.id === props.modelValue);
})

const onSelect = (id) => {
    emit('update:modelValue', id);
    emit('update:isSelectVisible', false);
}

const wrapperRef = ref(null);

const handleClick = (event) => {
    if (wrapperRef?.value && !wrapperRef?.value?.contains(event.target)){
        emit('update:isSelectVisible', false);
    }
}

onMounted(() => {
    document.addEventListener('click', handleClick);
})

onUnmounted(() => {
    document.removeEventListener('click', handleClick);
})

</script>

<template>
<div class="ui-select-wrapper" ref="wrapperRef">
    <div class="ui-select">
        <span>{{ selectedItem?.name_ru ?? selectedItem?.name }}</span>
    </div>
    <div v-if="isSelectVisible" class="ui-select__list-item-wrapper">
        <div class="ui-select__list">
            <div class="ui-select__list-item" v-for="item in consistantItems" :key="item.id" @click.stop="onSelect(item.id)">
                <div>{{ item.name_ru ?? item.name }}</div>
            </div>
        </div>
    </div>
</div>
</template>

<style scoped lang="scss">
.ui-select-wrapper{
    position: relative;
    display: flex;
    flex-direction: column;
    width: max-content;
    color: var(--black-olive-75);
    font-size: 12px;
    font-weight: 500;
}
.ui-select{
    display: flex;
    justify-content: flex-start;
    align-items: center;
    width: 100%;
    font-size: 12px;
    font-weight: 500;
    cursor: pointer;

    span{
        user-select: none;
    }

    &__list-item-wrapper{
        position: absolute;
        top: 35px; 
        right: -15px;
        min-width: 200px;
        border-top: 0;
        background: white;
        z-index: 10;
        box-shadow: 2px 2px 2px 4px rgba(0,0,0,0.1);
    }


    &__list{
        display: flex;
        flex-direction: column;
    }

    &__list-item{
        text-align: left;
        cursor: pointer;

        div {
            display: block;
            padding: 0 10px;
            margin-top: 7px;
            margin-bottom: 7px;  
        }

        &:first-child{
            margin-top: 7px;
        }

        &:last-child{
            margin-bottom: 7px;
        }

        &:hover{
            background-color: var(--neutral);
        }
    }
}
</style>