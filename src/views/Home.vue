<script setup>
import srpc from '../srpc.js'
import state from '../state.js'
import { useRouter } from 'vue-router'
const router = useRouter()
window.srpc = srpc
const token = 'token'

srpc('https://matrix.yzzx.org/srpc')
let service = $ref([])
let sid = $ref('')
async function get() {
  if (sid) srpc.service.get(token, sid)
    .then((s) => {
      if (s) service = [s]
    })
    .catch((e) => console.log(e))
  else srpc.service.getAll(token)
    .then((s) => service = s)
    .catch((e) => console.log(e))
}

</script>

<template>
  <div class="h-24 w-screen shadow-md px-8 flex items-center">
    <div class="text-2xl">Services</div>
    <div class="grow"></div>
    <input v-model="sid" class="border-sky-500 border p-1 rounded-sm focus:ring-1" @keyup.enter="get">
  </div>
  <div class="w-screen font-mono px-12 py-10">
    <div v-for="s in service" class="m-2">
      <div class="text-lg rounded-sm p-1 cursor-pointer" @click="router.push('/@/' + s._id); state.endpoint = s.endpoint">{{ s.name }}</div>
    </div>
  </div>
</template>