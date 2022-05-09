<script setup>
import Request from '../components/Request.vue'
const F = {
  N: 'test.test',
  A: ['params1', 'param2', 'param3'],
  P: [1, 'haha', { test: 'test' }],
  R: ['params1', 'param2', 'param3'],
  E: '127.0.0.1'
}
</script>

<template>
  <request :F="F"></request>
</template>