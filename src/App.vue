<script setup>
import state from './state.js'
import loading from './assets/loading.svg'
</script>

<template>
  <router-view></router-view>
  <transition name="fade">
    <div class="top-0 left-0 w-screen h-screen fixed z-50 bg-gray-100 flex flex-col justify-center items-center" v-if="state.loading">
      <img :src="loading" class="w-30">
    </div>
  </transition>
</template>
