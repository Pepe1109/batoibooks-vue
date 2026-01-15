<template>
  <div class="card">
    <img :src="book.photo || '/img/default-book.png'" :alt="'Libro ' + book.id">
    <div class="card-info">
      <h3>{{ book.moduleCode }} ({{ book.id }})</h3>
      <h4>{{ book.publisher }}</h4>
      <p>{{ book.pages }} páginas</p>
      <p>Estado: {{ book.status }}</p>
      <p>{{ book.soldDate ? `Vendido el ${book.soldDate}` : 'En venta' }}</p>
      <p><i>{{ book.comments }}</i></p>
      <h4><strong>{{ Number(book.price).toFixed(2) }} €</strong></h4>
    </div>
    <div class="card-buttons">
      <button @click="$emit('cart', book.id)">🛒</button>
      <button @click="$emit('edit', book.id)">✏️</button>
      <button @click="$emit('remove', book.id)">🗑️</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  book: Object
})
// 2. Declarar los nuevos eventos que puede emitir este componente
defineEmits(['remove', 'edit', 'cart'])
</script>

<style scoped>
/* ... tus estilos ... */
</style>