<script setup>
const { f } = defineProps(['f'])
</script>

<template>
  <hr class="mb-2">
  <p>Here is function details of {{ f.name }}</p>
</template>