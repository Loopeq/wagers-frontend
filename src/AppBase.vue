<template>
  <component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import '@mdi/font/css/materialdesignicons.css';
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import AuthLayout from './layout/AuthLayout.vue';
import MainLayout from './layout/MainLayout.vue';
import AdminLayout from './layout/AdminLayout.vue';
import BetLayout from './layout/BetLayout.vue';

export default {
  setup(){
    const route = useRoute()
    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components: {AuthLayout, MainLayout, AdminLayout, BetLayout}
}
</script> 


<style lang="scss">
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
html,
body {
   margin: 0;
   padding: 0;
}

:root{
  --floral-white: rgb(255, 252, 242);
  --floral-white-80: rgb(255, 252, 242, .8);
  --timberwolf: #89a0b2;
  --surface: rgb(237, 241, 246);
  --surface-50: rgb(237, 241, 246, .5);
  --surface-75: rgb(237, 241, 246, .75);
  --timberwolf-15: rgb(204, 197, 185, 15%);
  --timberwolf-30: rgb(204, 197, 185, 30%);
  --black-olive: rgb(64, 61, 57);
  --black-olive-75: rgb(64, 61, 57, .75);
  --black-olive-50: rgb(64, 61, 57, .5);
  --neutral: rgba(34,34,38,0.15);
  --eerie-black: #252422;
  --flame: rgb(235, 94, 40);
  --flame-70: rgb(235, 94, 40, 80%);
  --flame-15: rgb(235, 94, 40, 15%);
  --base-gradient: var(--floral-white), var(--timberwolf), var(--black-olive), var(--eerie-black), var(--flame);
  --neutral-gradient: var(--flame-15), white;
  --danger: #e74c3c;
  --danger-90: rgba(231, 76, 60, 0.9);
  --danger-75: rgba(231, 76, 60, 0.75);
  --danger-70: rgba(231, 76, 60, 0.7);
  --danger-50: rgba(231, 76, 60, 0.5);
  --danger-30: rgba(231, 76, 60, 0.3);
  --danger-15: rgba(231, 76, 60, 0.15);

  --agree: #27ae60;
  --agree-90: rgba(39, 174, 96, 0.9);
  --agree-75: rgba(39, 174, 96, 0.75);
  --agree-70: rgba(39, 174, 96, 0.7);
  --agree-50: rgba(39, 174, 96, 0.5);
  --agree-30: rgba(39, 174, 96, 0.3);
  --agree-15: rgba(39, 174, 96, 0.15);

  --indigo: rgb(75, 0, 130);
  --indigo-70: rgb(75, 0, 130, 0.7);

  --gradient-top: linear-gradient(0deg, var(--base-gradient));
  --gradient-right: linear-gradient(90deg, var(--base-gradient));
  --gradient-bottom: linear-gradient(180deg, var(--base-gradient));
  --gradient-left: linear-gradient(270deg, var(--base-gradient));
  
  --gradient-tr: linear-gradient(45deg, var(--base-gradient));
  --gradient-br: linear-gradient(135deg, var(--base-gradient));
  --gradient-tl: linear-gradient(225deg, var(--base-gradient));
  --gradient-bl: linear-gradient(315deg, var(--base-gradient));
  
  --gradient-radial: radial-gradient(var(--base-gradient));

  --neutral-top: linear-gradient(0deg, var(--neutral-gradient));
  --neutral-bottom: linear-gradient(180deg, var(--neutral-gradient));
  --border-radius-medium: 10px;
  --border-radius-small: 8px;
  --container-padding: 0px 40px;
  --header-height: 60px;
  --header-bet-height: 140px;
}
html{
  font-size: 10px;
  font-weight: 700;
  color: var(--eerie-black);
  font-family: 'Roboto';
}
body{
  background-color: var(--surface);
}
header{ 
  background-color: var(--eerie-black);
  color: var(--floral-white);
}
button, input[type="submit"], input[type="reset"] {
	background: none;
	color: inherit;
	border: none;
	padding: 0;
	font: inherit;
	cursor: pointer;
	outline: inherit;
}
input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

input[type=number] {
  -moz-appearance: textfield;
}

.card{ 
  border-radius: var(--border-radius-small);
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.text-medium{
  color: var(--agree-70);
  opacity: 1;
}
.text-medium-negative{
  color: var(--danger-70);
  opacity: 1;
}

.text-strong{
  color: var(--agree);
  opacity: 1;
}
.text-strong-negative{
  color: var(--danger);
  opacity: 1;
}

input:-webkit-autofill {
  -webkit-box-shadow: 0 0 0 1000px white inset !important;
  box-shadow: 0 0 0 1000px white inset !important;
  -webkit-text-fill-color: #000 !important; /* цвет текста */
  transition: background-color 5000s ease-in-out 0s; /* хак чтобы фон не возвращался */
}

.ui-table-wrapper{
  margin-top: 20px;
  border: 1px solid var(--neutral);
  border-radius: var(--border-radius-small);
}
.ui-table{
  overflow: hidden;
  border-collapse: collapse;
  font-weight: 500;
  width: 100%;

  th, td {
    padding: 12px;
    text-align: center;
  }

  tbody tr:nth-child(odd) {
    background-color: var(--surface-50);
  }
  
  td {
    font-size: 12px;
  }
  
  thead {
    font-size: 10px;
    text-transform: uppercase;
    border-bottom: 1px solid var(--neutral);
    letter-spacing: 5%;
  }

  .left{
    text-align: left;
  }

  td.time-cell {
    font-size: 12px;
    font-style: italic;
  }
}

@supports (scrollbar-color: auto) {
  * {
    scrollbar-color: #888 transparent; /* thumb / track прозрачный */
    scrollbar-width: thin;             /* тонкий скроллбар */
  }
}

*::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background: transparent; /* прозрачный трек, убираем фон */
}

*::-webkit-scrollbar-thumb {
  background: #888;       /* ползунок */
  border-radius: 4px;     /* закругление */
}

*::-webkit-scrollbar-thumb:hover {
  background: #555;       /* темнее при наведении */
}

/* Убираем стрелки (класс old-school) */
*::-webkit-scrollbar-button {
  display: none;
}

*::-webkit-scrollbar-corner {
  background: transparent; /* угол скроллбаров прозрачный */
}

</style>