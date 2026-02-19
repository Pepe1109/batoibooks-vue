<template>
  <div id="app">
    <header>
      <h1>BatoiBooks</h1>
    </header>

    <AppMenu />

    <main>
      <router-view />
    </main>
  </div>
</template>

<script setup>
import AppMenu from './components/AppMenu.vue'
import './assets/main.css'
</script>