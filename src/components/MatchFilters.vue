<template>
    <div class="box-row mb-15">
        <DropDownMenu v-if='timeFilters.length' :filters="timeFilters" type="time_filters"/>
        <DropDownMenu v-if='valueFilters.length' :filters="valueFilters" type="value_filters"/>
        <AppCheckBox type="not_null_point_filter"/>
    </div>
</template>

<script>
import DropDownMenu from './DropDownMenu.vue';
import AppCheckBox from './AppCheckBox.vue';
    export default {
        props: ['timeFilters', 'valueFilters'], 

        components: {DropDownMenu, AppCheckBox}
    }
</script>

<style scoped>

.box-row > *{
    flex: 1;
}


</style>