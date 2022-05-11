<script setup>
import srpc from '../srpc.js'
import state from '../state.js'
import { useRouter } from 'vue-router'
import { CubeIcon } from '@heroicons/vue/outline'
const router = useRouter()

let services = $ref([])

async function init () {
  const res = await srpc.service.getAll(state.token)
  if (!res) Swal.fire('Error', '', 'error')
  services = res
}
init()

function go (s) {
  state.service = s
  router.push('/service')
}
</script>

<template>
  <div class="w-full min-h-screen bg-gray-100 p-4 sm:p-10">
    <h1 class="text-3xl font-bold">Matrix</h1>
    <hr class="my-4">
    <div>
      <div v-for="s in services" class="all-transition my-2 py-2 px-4 rounded-lg bg-white cursor-pointer shadow hover:shadow-md" @click="go(s)">
        <h3 class="text-xl font-bold flex items-center">
          <cube-icon class="w-8 text-gray-800 mr-2" />
          {{ s.name }}
        </h3>
        <p class="text-gray-400 text-xs m-1 break-all">{{ s.endpoint }}</p>
      </div>
    </div>
  </div>
</template>