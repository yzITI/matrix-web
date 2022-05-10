<script setup>
import { useRoute, useRouter } from 'vue-router'
import Request from '../components/Request.vue'
import srpc from '../srpc.js'
const router = useRouter(), route = useRoute()
const token = 'token'

const sid = route.params.id
let functions = $ref([])
let show = $ref(false)
srpc('https://matrix.yzzx.org/srpc')
srpc.function.getByService(token, sid)
  .then((f) => functions = f)
  .catch((e) => console.log(e))

</script>

<template>
  <div v-for="f in functions">
    <div class="text-xl" @click="show = true">{{ f.name }}</div>
    <request v-if="show" :func="f"/>
  </div>
</template>