<script setup>
// Define reactive data and props
import { ref } from '@vue/reactivity';

const counter = ref(0);
const doubled = computed(() => counter.value * 2);
const greeting = computed(() => `Hello, Vue 3!${doubled.value}`);

// Define a function
function incrementCounter() {
  counter.value++;
}

const _zero = doubled.value + counter;
</script>

<template>
  <div>
    <h1>
      {{ greeting }}
    </h1>
    <button @click="incrementCounter">
      Click me!
    </button>
    <p>Counter: {{ counter }}</p>
  </div>
</template>
