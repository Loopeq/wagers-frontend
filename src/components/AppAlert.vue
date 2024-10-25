<template>
    <div class="alert" v-if="alert" :class="alert.type">
      <p>{{ alert.title }}</p>
      <p>{{ alert.text }}</p>
      <button v-if='closable' class="btn" :class="alert.type" @click="$emit('close')">Закрыть</button>
    </div>
  </template>
  
  <script>
  export default {
    emits: ['close'],
    props: ['alert', 'closable']
  }
  </script>
  
  <style scoped>
  
  </style>