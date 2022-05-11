<script setup>
import { useRoute, useRouter } from 'vue-router'
import Request from '../components/Request.vue'
import state from '../state.js'
import srpc from '../srpc.js'
const router = useRouter(), route = useRoute()
const token = 'token'

const sid = route.params.id
let functions = $ref([])
let show = $ref(0)
let select = $ref({})
srpc('https://matrix.yzzx.org/srpc')
srpc.function.getByService(token, sid)
  .then((f) => functions = f)
  .catch((e) => console.log(e))
for (const f in functions) show.push(0)
</script>

<template>
  <div class="h-24 w-screen shadow-md px-8 flex items-center">
    <div class="text-2xl mr-6">Functions</div>
    <input v-model="state.endpoint" class="border-sky-500 border p-1 rounded-sm focus:ring-1">
    <div class="grow"></div>
    <input class="border-sky-500 border p-1 rounded-sm focus:ring-1">
  </div>
  <div class="w-screen font-mono px-12 py-10">
    <div v-for="f in functions" class="m-2">
      <div class="text-lg rounded-sm p-1 cursor-pointer" @click="select = f; show++">{{ f.name }}</div>
    </div>
    <request v-if="show" :show="show" :func="select" />
  </div>
</template>