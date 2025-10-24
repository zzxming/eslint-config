[foo](/url)

| User Name | Date of Birth | Favorite Color |
| --------- | ------------- | -------------- |
| Alice     | 2000-01-01    | Blue           |
| Bob       | 1995-05-23    | Green          |

1. foo
2. bar
3. bar
4. baz

## Section Title

Lorem ipsum.

```vue
<script setup>
// Define reactive data and props
import { ref } from '@vue/reactivity';

const greeting = ref(`Hello, Vue 3!${1}`);
const counter = ref(0);
const doubled = computed(() => counter.value * 2);

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
```

```ts
export interface StylisticConfigOptions {
  indent: number | 'tab';
  jsx: boolean;
  quotes: 'double' | 'single';
  semi: boolean;
}
```

```css
body {
  margin: 0;
}
```