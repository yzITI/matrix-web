<script setup>
import state from '../state.js'
import { PencilIcon, XIcon } from '@heroicons/vue/outline'
const { f } = defineProps(['f'])

const v = $ref({})
const edit = $ref(false)
const res = $ref(null)

for (const o of f.args) v[o.name] = o.placeholder || ''
if ('T' in v) v.T = `"${state.token}"`

function excute () {
  srpc(state.service.endpoint)
  const a = []
  for (const o of f.args) {
    console.log(v[o.name])
    a.push(JSON.parse(v[o.name]))
  }
  srpc[f.name](...a)
    .then((r) => { res = r; console.log(f.name, r) })
    .catch(e => console.log(e))
}

</script>

<template>
  <div class="w-full relative font-mono mb-2">
    <div v-if="edit" class="absolute right-2 top-0 flex text-red-400 bg-red-100 p-1 border border-red-400 rounded cursor-pointer text-sm" @click="edit = false">
      <x-icon class="w-4" />
      cancel
    </div>
    <div v-else class="absolute right-2 top-0 flex text-green-400 bg-green-100 p-1 border border-green-400 rounded cursor-pointer text-sm" @click="edit = true">
      <pencil-icon class="w-4" />
      edit
    </div>
    <div v-for="o in f.args" class="pl-4">
      <div class="text-xl">{{ o.name }}</div>
      <div class="text-sm text-gray-400">{{ o.description }}</div>
      <div class="pl-4 m-2"><textarea v-model="v[o.name]" class="border w-full" :disabled="!edit"></textarea></div>
    </div>
    <div v-if="edit">
      <div class="flex justify-center text-xl p-1 border border-blue-400 bg-blue-100 text-blue-400 rounded cursor-pointer" @click="excute">excute</div>
      <div class="text-xl m-2">Response</div>
      <div class="ml-4 mr-2 px-2 py-1 border bg-gray-50 break-normal">{{ res }}</div>
    </div>
    <div class="text-xl m-2">Response Example</div>
    <div class="ml-4 mr-2 px-2 py-1 border bg-gray-50">{{ f.res }}</div>
  </div>
</template>