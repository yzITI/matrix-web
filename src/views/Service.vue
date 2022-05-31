<script setup>
import srpc from '../srpc.js'
import testSrpc from '../utils/test-srpc.js'
import state from '../state.js'
import { CubeIcon, PlusIcon, PencilIcon, ChevronRightIcon, ArrowCircleRightIcon } from '@heroicons/vue/outline'
import SideDrawer from '../components/SideDrawer.vue'
import Wrapper from '../components/Wrapper.vue'
import Detail from '../components/Detail.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

let functions = $ref([]), showDetail = $ref({}), loading = $ref(true)
let showEditor = $ref(false), draft = $ref({}), arg = $ref('')

async function init () {
  if (!state.service._id) return router.push('/home')
  testSrpc(state.service.endpoint)
  functions = []
  const res = await srpc.function.getByService(state.token, state.service._id)
  loading = false
  if (!res) Swal.fire('Error', '', 'error')
  res.sort((a, b) => a.name > b.name ? 1 : -1)
  functions = res
}
init()

function edit (s) {
  showEditor = true
  draft = JSON.parse(JSON.stringify(s))
  draft.service = state.service._id
  if (!draft.args) draft.args = []
}

async function submit () {
  if (!draft.name) return
  const _id = draft._id || Math.random().toString(36).substring(2)
  delete draft._id
  state.loading = true
  await srpc.function.put(state.token, _id, draft)
  state.loading = false
  showEditor = false
  draft = null
  init()
}

async function del () {
  if (!draft._id) return
  state.loading = true
  await srpc.function.del(state.token, draft._id)
  state.loading = false
  showEditor = false
  draft = null
  init()
}

function dist (x, y) {
  const xs = x.split('.'), ys = y.split('.')
  for (let i = 0; i < xs.length; i++) {
    if (!ys[i] || ys[i] !== xs[i]) return i
  }
  return xs.length
}

async function updateArgs () {
  const newArgs = arg.split(',').map(x => x.split('=')).map(x => ({ name: x[0].trim(), default: x[1]?.trim() }))
  // auto find description
  for (const a of newArgs) {
    for (const o of draft.args) {
      if (o.name === a.name && o.description) a.description = o.description
    }
    if (a.description) continue
    let max = -1, description = ''
    for (const f of functions) {
      if (!f.args) continue
      let des = ''
      for (const o of f.args) {
        if (o.name === a.name && o.description) {
          des = o.description
          break
        }
      }
      if (!des) continue
      const d = dist(f.name, draft.name)
      if (d > max) {
        max = d
        description = des
      }
    }
    if (description) a.description = description
  }
  draft.args = newArgs
  arg = ''
}

function countClass (cnt) {
  if (!cnt) return 'text-gray-500'
  if (cnt < 100) return 'text-green-500'
  if (cnt < 1000) return 'text-yellow-500'
  return 'text-red-500 font-bold'
}
</script>

<template>
  <div class="w-full min-h-screen bg-gray-100 p-4 sm:p-10">
    <h1 class="text-3xl font-bold flex items-center cursor-pointer" @click="router.push('/home')">
      <cube-icon class="w-8 text-gray-800 mr-2" />
      {{ state.service.name }}
    </h1>
    <p class="my-2 text-gray-400 text-sm">{{ state.service.endpoint }}</p>
    <hr class="mb-4">
    <p v-if="loading">Loading...</p>
    <div v-else>
      <div v-for="f in functions" class="relative all-transition my-2 py-2 px-4 rounded-lg bg-white shadow hover:shadow-md" :key="f._id">
        <h3 class="text-xl font-bold font-mono flex items-center">
          <chevron-right-icon class="w-6 cursor-pointer all-transition text-gray-600 mr-2" :class="showDetail[f._id] ? 'rotate-90' : ''" @click="showDetail[f._id] = !showDetail[f._id]" />
          {{ f.name }}
          <button class="all-transition bg-blue-50 border border-blue-400 rounded ml-2 p-1 font-bold hover:bg-blue-100" @click="edit(f)">
            <pencil-icon class="w-4 text-blue-400" />
          </button>
          <div class="opacity-50 text-xs sm:opacity-100 sm:text-sm absolute top-0 right-2 font-mono font-normal" :class="countClass(f.count)">{{ f.count || 0 }}</div>
        </h3>
        <p class="text-gray-400 text-xs m-1 break-all">{{ f.description }}</p>
        <wrapper :show="showDetail[f._id]">
          <detail :f="f"></detail>
        </wrapper>
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
        Function
      </h1>
      <p class="text-gray-400 font-mono mb-4">{{ draft._id || 'new function' }}</p>
      <div class="font-bold my-2">Name: <input class="font-mono" v-model="draft.name"></div>
      <div class="font-bold my-2">Description: <input v-model="draft.description"></div>
      <div class="font-bold mt-2 overflow-x-auto flex flex-col">
        Arguments:
        <div class="flex items-center mb-2">
          <input class="font-mono text-sm" style="width: 80%;" placeholder="Formatted Argument List" v-model="arg" @keyup.enter="updateArgs">
          <arrow-circle-right-icon class="w-6 ml-2 cursor-pointer text-blue-500" @click="updateArgs" />
        </div>
        <div class="font-normal py-1 pl-1 border-l-2 border-gray-600" v-for="a in draft.args">
          <code class="bg-gray-200 px-2 py-1">{{ a.name }}{{ a.default ? `(${a.default})` : '' }}</code>
          <input placeholder="Description" v-model="a.description">
        </div>
      </div>
      <div class="font-bold my-2">Return: <input v-model="draft.return"></div>
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
