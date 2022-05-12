<script setup>
import srpc from '../srpc.js'
import state from '../state.js'
import { CubeIcon, PlusIcon, PencilIcon } from '@heroicons/vue/outline'
import SideDrawer from '../components/SideDrawer.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

let services = $ref([]), loading = $ref(true)
let showEditor = $ref(false), draft = $ref({})

async function init () {
  const res = await srpc.service.getAll(state.token)
  loading = false
  if (!res) Swal.fire('Error', '', 'error')
  services = res
}
init()

function go (s) {
  state.service = s
  router.push('/service')
}

function edit (s) {
  showEditor = true
  draft = JSON.parse(JSON.stringify(s))
}

async function submit () {
  if (!draft.name) return
  const _id = draft._id || Math.random().toString(36).substring(2)
  delete draft._id
  state.loading = true
  await srpc.service.put(state.token, _id, draft)
  state.loading = false
  showEditor = false
  draft = null
  init()
}

async function del () {
  if (!draft._id) return
  state.loading = true
  await srpc.service.del(state.token, draft._id)
  state.loading = false
  showEditor = false
  draft = null
  init()
}
</script>

<template>
  <div class="w-full min-h-screen bg-gray-100 p-4 sm:p-10">
    <h1 class="text-3xl font-bold flex items-center">
      <img class="w-10 mr-2" src="/logo.svg">
      Matrix
    </h1>
    <hr class="my-4">
    <p v-if="loading">Loading...</p>
    <div v-else>
      <div v-for="s in services" class="all-transition my-2 py-2 px-4 rounded-lg bg-white cursor-pointer shadow hover:shadow-md" @click="go(s)">
        <h3 class="text-xl font-bold flex items-center">
          <cube-icon class="w-8 text-gray-600 mr-2" />
          {{ s.name }}
          <button class="all-transition bg-blue-50 border border-blue-400 rounded ml-2 p-1 font-bold hover:bg-blue-100" @click.stop="edit(s)">
            <pencil-icon class="w-4 text-blue-400" />
          </button>
        </h3>
        <p class="text-gray-400 text-xs m-1 break-all">{{ s.endpoint }}</p>
      </div>
    </div>
  </div>
  <button class="all-transition bg-blue-500 text-white rounded-full p-3 shadow hover:shadow-md fixed right-10 bottom-10 font-bold" @click="edit({})">
    <plus-icon class="w-8" />
  </button>
  <side-drawer v-model="showEditor"><!-- editor -->
    <div class="m-4" v-if="draft">
      <h1 class="text-3xl font-bold flex items-center">
        <pencil-icon class="w-8 text-gray-800 mr-2" />
        Service
      </h1>
      <p class="text-gray-400 font-mono mb-4">{{ draft._id || 'new service' }}</p>
      <div class="font-bold my-2">Name: <input v-model="draft.name"></div>
      <div class="font-bold my-2">Endpoint: <input v-model="draft.endpoint"></div>
      <div class="flex items-center my-4">
        <button class="all-transition px-3 py-1 rounded text-white shadow hover:shadow-md font-bold" :class="draft.name ? 'bg-blue-500' : 'bg-gray-500'" @click="submit">Submit</button>
        <button class="all-transition px-3 py-1 ml-2 rounded text-white bg-red-500 shadow hover:shadow-md font-bold" v-if="draft._id" @click="del">Delete</button>
      </div>
    </div>
  </side-drawer>
</template>

<style scoped>
input {
  @apply border rounded px-2 py-1 block w-full;
}
</style>
