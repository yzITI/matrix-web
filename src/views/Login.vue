<script setup>
import state from '../state.js'
import { useRouter } from 'vue-router'
const router = useRouter()

function login () {
  window.open('https://cn.aauth.link/#/?app=matrix', 'aauth', 'width=400,height=800,top=50,left=50')
}

window.onmessage = e => {
  if (e.origin !== 'https://cn.aauth.link') return
  if (!e.data.token) return
  state.token = e.data.token
  router.push('/home')
}
</script>

<template>
  <div class="w-screen h-screen flex items-center justify-center">
    <h1 class="text-4xl sm:text-6xl font-bold flex items-center">
      <img class="w-12 sm:w-20 mr-2" src="/logo.svg" @click="login">
      Matrix
    </h1>
  </div>
</template>