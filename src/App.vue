<script setup>
import HeaderItem from './components/HeaderItem.vue'
import FormView from './components/FormView.vue'
</script>

<template>
  <header>
    <HeaderItem></HeaderItem>
  </header>
  <div class="container">
    <FormView></FormView>
  </div>
</template>

<style scoped>
header {
  margin-bottom: 3rem;
}

#app {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0;
}
</style>
