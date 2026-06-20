<template>
  <div>
    <h1>
      {{ greeting }}</h1>
    <button @click="incrementCounter">Click me!</button>
    <p>Counter: {{ counter  }}</p>
  </div>
</template>

<script setup>
// Define reactive data and props
import { ref  } from '@vue/reactivity';

let counter = ref(0)
let doubled = computed(() => counter.value * 2);
const greeting = computed(() => 'Hello, Vue 3!' + doubled.value);

// Define a function
const incrementCounter = () => {
  counter.value++;
};

let _zero = doubled + counter
</script>