<script setup>
import state from '../state.js'
import { AdjustmentsIcon, XIcon } from '@heroicons/vue/outline'
import srpc from '../utils/test-srpc.js'
const { f } = defineProps(['f'])

let v = $ref({}), edit = $ref(false), res = $ref(null), loading = $ref(false)

async function execute () {
  const a = []
  try {
    for (const o of f.args) a.push(eval(v[o.name]))
  } catch {
    return Swal.fire('Invalid Argument', 'Arguments follow JS syntax', 'error')
  }
  console.log('Test Function:', f.name, a)
  loading = true
  await srpc[f.name](...a)
    .then(r => { res = JSON.stringify(r, null, 2) })
    .catch(e => { Swal.fire('Error', e, 'error') })
  loading = false
}
</script>

<template>
  <div class="w-full relative">
    <div v-for="o in f.args" class="py-1 sm:mx-4">
      <div>
        <code class="py-1 px-2 bg-gray-200 mr-2">{{ o.name }}</code>
        <span class="text-sm text-gray-400">{{ o.description }}</span>
      </div>
      <textarea v-if="edit" v-model="v[o.name]" class="p-1 font-mono block border w-full"></textarea>
    </div>
    <div class="flex items-center mt-2 p-1 sm:mx-4 text-sm">
      <div v-if="edit" class="all-transition px-3 py-1 mr-2 text-center border border-blue-400 bg-blue-100 text-blue-400 rounded cursor-pointer hover:bg-blue-400 hover:text-white" @click="execute">{{ loading ? 'Loading...' : 'Test Function' }}</div>
      <div class="flex p-1 border rounded cursor-pointer" :class="edit ? 'border-red-400 text-red-400 bg-red-100' : 'border-yellow-500 text-yellow-500 bg-yellow-100'" @click="edit = !edit">
        <x-icon v-if="edit" class="w-4" />
        <adjustments-icon v-else class="w-4" />
        {{ edit ? 'Cancel' : 'Test' }}
      </div>
    </div>
    <div v-if="edit && res && !loading" class="sm:mx-4 mt-2 py-1 overflow-x-auto border bg-gray-50">
      <div class="px-2 py-1 font-mono whitespace-pre">{{ res }}</div>
    </div>
  </div>
</template>