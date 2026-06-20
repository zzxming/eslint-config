[foo](
  /url
)


| User Name | Date Of Birth | Favorite Color |
| --- | --- | --- |
| Alice | 2000-01-01 | Blue |
| Bob | 1995-05-23 | Green |

0. foo
1. bar
3. bar
4. baz

##   Section  Title

Lorem   ipsum.

```vue
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
const greeting = computed(() => `Hello, Vue 3!${doubled.value}`);

// Define a function
const incrementCounter = () => {
  counter.value++;
};

let _zero = doubled + counter
</script>
```

```ts

export interface StylisticConfigOptions {
  indent: number | 'tab'
  jsx: boolean; quotes: 'double' | 'single';
  semi: boolean;
}
```

```css
body { margin: 0; }
```