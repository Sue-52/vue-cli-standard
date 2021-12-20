<template>
  <div>{{ name }}</div>
</template>

<script setup>
import { ref } from "vue";

const name = ref("sue");
</script>

<style lang="scss">
div {
  color: red;
}
</style>
