<template>
  <section id="list">
    <h2>Lista de Libros</h2>
    
    <div class="book-grid">
      <BookItem 
        v-for="book in books" 
        :key="book.id" 
        :book="book"
        @remove="$emit('remove', $event)" 
      />
    </div>

    <div class="totals" v-if="books.length > 0">
      <p>Total de libros: <strong>{{ totalBooks }}</strong></p>
      <p>Importe total: <strong>{{ totalImport }} €</strong></p>
    </div>
    <p v-else>No hay libros disponibles.</p>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import BookItem from './BookItem.vue'

const props = defineProps({
  books: Array
})

// Reemitimos el evento de borrado hacia App.vue
defineEmits(['remove'])

// Propiedades computadas para los totales
const totalBooks = computed(() => props.books.length)
const totalImport = computed(() => {
  return props.books
    .reduce((acc, book) => acc + Number(book.price), 0)
    .toFixed(2)
})
</script>

<style scoped>
.book-grid { display: flex; flex-wrap: wrap; gap: 1em; justify-content: center; }
.totals { margin-top: 2em; padding: 1em; background-color: #f0f0f0; border-radius: 5px; color: #333;}
</style>