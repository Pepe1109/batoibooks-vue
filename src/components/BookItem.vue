<template>
  <div class="card">
    <img :src="book.photo || '/img/default-book.png'" :alt="'Libro ' + book.id">
    
    <div class="card-info">
      <h3>{{ book.moduleCode }} ({{ book.id }})</h3>
      <h4>{{ book.publisher }}</h4>
      <p>{{ book.pages }} páginas</p>
      <p>Estado: {{ book.status === 'good' ? 'Bueno' : 'Malo' }}</p>
      <p>{{ book.soldDate ? `Vendido el ${book.soldDate}` : 'En venta' }}</p>
      <p><i>{{ book.comments }}</i></p>
      <strong>{{ Number(book.price).toFixed(2) }} €</strong>
    </div>
    
    <div class="card-buttons">
      <button @click="$emit('cart', book.id)" title="Al carrito">🛒</button>
      <button @click="$emit('edit', book.id)" title="Editar">✏️</button>
      <button @click="$emit('remove', book.id)" title="Borrar">🗑️</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  book: Object
})
defineEmits(['remove', 'edit', 'cart'])
</script>