<script setup>
import srpc from '../srpc.js'
import state from '../state.js'
const { func } = defineProps(['func'])

srpc(state.endpoint)

let res = $ref('')
let placeholder = $ref(func.placeholder)
function test() {
  let args = []
  for (const p of placeholder) args.push(JSON.parse(p))
  srpc[func.name](...args)
    .then((r) => res = r)
    .catch((e) => console.log(e))
}
</script>

<template>
  <div class="h-screen w-screen bg-gray-200 opacity-75 font-mono z-50 absolute">
    <div class="h-screen w-5/6 md:w-1/3 bg-white shadow-lg p-8">
      <div class="text-2xl">{{ func.name }}</div>
      <div class="text-xl text-gray-500">{{ endpoint }}</div>
      <div class="text-xl text-sky-500 mt-4">REQ</div>
      <div v-for="i in func.args.length" class="m-2">
        <div class="text-lg">{{ func.args[i - 1] }}</div>
        <input class="border placeholder:italic placeholder:text-slate-400 block border border-slate-300 rounded-sm py-1 px-1 shadow-sm focus:outline-none focus:border-sky-500" v-model="placeholder[i - 1]" :placeholder="func.placeholder[i - 1]">
      </div>
      <button class="cursor-pointer rounded-sm bg-green-400 p-2" @click="test">test</button>
      <div class="text-xl">res: {{ res }}</div>
    </div>
  </div>
</template>