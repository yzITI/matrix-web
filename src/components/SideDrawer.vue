<script setup>
const props = defineProps(['modelValue', 'side'])
const emits = defineEmits(['update:modelValue'])
let style = $computed(() => {
  if (props.side === 'right') return { right: props.modelValue ? 0 : '-25rem' }
  else return { left: props.modelValue ? 0 : '-25rem' }
})
</script>

<template>
  <transition name="fade">
    <div v-if="props.modelValue" @click="emits('update:modelValue', false)" class="fixed top-0 left-0 w-screen h-screen bg-black opacity-30 z-30" />
  </transition>
  <div class="all-transition bg-white w-96 h-screen overflow-y-auto top-0 z-40 fixed" style="max-width: 90vw;" :style="style">
    <slot></slot>
  </div>
</template>