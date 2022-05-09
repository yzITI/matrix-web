<script setup>
import srpc from '../srpc.js'
const { F } = defineProps(['F'])
let f = srpc(F.E)
const N = F.N.split('.')
// for (const n of N) f = f[n]

let res = $ref('')
let P = $ref(F.P)
for (const i in P) P[i] = JSON.stringify(P[i])
function submit() {
  for (const i in P) P[i] = JSON.parse(P[i])
  res = f(...P).R
}
</script>

<template>
  <div class="h-screen w-screen bg-gray-200 opacity-75 font-mono">
    <div class="h-screen w-5/6 md:w-1/3 bg-white shadow-lg p-8">
      <div class="text-2xl">{{ F.N }}</div>
      <div class="text-xl text-gray-500">{{ F.E }}</div>
      <div class="text-xl text-sky-500 mt-4">REQ</div>
      <div v-for="i in F.P.length" class="m-2">
        <div class="text-lg">{{ F.A[i - 1] }}</div>
        <input class="border placeholder:italic placeholder:text-slate-400 block border border-slate-300 rounded-sm py-1 px-1 shadow-sm focus:outline-none focus:border-sky-500" v-model="P[i - 1]" :placeholder="F.P[i - 1]">
      </div>
    </div>
  </div>
</template>