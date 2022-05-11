<script setup>
import { useRouter } from 'vue-router'
import { CubeIcon, ChevronRightIcon } from '@heroicons/vue/outline'
import state from '../state.js'
import srpc from '../srpc.js'
const router = useRouter()

let functions = $ref([]), loading = $ref(true)

async function init () {
  if (!state.service) return router.push('/')
  const res = await srpc.function.getByService(state.token, state.service._id)
  loading = false
  if (!res) Swal.fire('Error', '', 'error')
  functions = res
}
init()
</script>

<template>
  <div class="w-full min-h-screen bg-gray-100 p-4 sm:p-10">
    <h1 class="text-3xl font-bold flex items-center">
      <cube-icon class="w-8 text-gray-800 mr-2" />
      {{ state.service.name }}
    </h1>
    <p class="text-sm my-2 text-gray-400">{{ state.service.endpoint }}</p>
    <hr class="mb-4">
    <p v-if="loading">Loading...</p>
    <div v-else>
      <div v-for="f in functions" class="all-transition my-2 py-2 px-4 rounded-lg bg-white cursor-pointer shadow hover:shadow-md">
        <h3 class="text-xl font-bold flex items-center">
          <chevron-right-icon class="w-6 text-gray-800 mr-2" />
          {{ f.name }}
        </h3>
      </div>
    </div>
  </div>
</template>