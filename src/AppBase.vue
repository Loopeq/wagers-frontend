<template>
  <component :is="layout + '-layout'" v-if="layout" />
</template>

<script>
import '@mdi/font/css/materialdesignicons.css';
import {computed} from 'vue';
import {useRoute} from 'vue-router';
import AuthLayout from './layout/AuthLayout.vue';
import MainLayout from './layout/MainLayout.vue';

export default {
  setup(){
    const route = useRoute()
    return {
      layout: computed(() => route.meta.layout)
    }
  },
  components: {AuthLayout, MainLayout}
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
  --floral-white: #fffcf2;
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
  --header-height: 80px;
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
input {
  font-size: inherit !important;
  &:disabled {
    font-size: inherit !important;
  }
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
</style>