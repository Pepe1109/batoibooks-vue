<template>
  <section id="list">
    <div class="book-grid">
      <BookItem 
        v-for="book in books" 
        :key="book.id" 
        :book="book"
      >
        <template #buttons>
          <button 
            @click="$emit('add-to-cart', book)" 
            title="Añadir al carrito"
            :disabled="cart.some(b => b.id === book.id)"
            :style="{ opacity: cart.some(b => b.id === book.id) ? 0.5 : 1, cursor: cart.some(b => b.id === book.id) ? 'not-allowed' : 'pointer' }"
          >🛒</button>
          
          <button @click="$router.push(`/edit/${book.id}`)" title="Editar">✏️</button>
          <button @click="borrarLibro(book.id)" title="Borrar">🗑️</button>
        </template>
      </BookItem>
    </div>

    <div class="totals" v-if="books.length > 0">
      <p>Total de libros en BD: <strong>{{ books.length }}</strong></p>
    </div>
    <p v-else style="text-align: center;">No hay libros disponibles en la BD.</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import BookItem from './BookItem.vue'

defineProps({
  cart: { type: Array, default: () => [] }
})

defineEmits(['add-to-cart'])

const books = ref([])

const cargarLibros = async () => {
  try {
    const res = await api.get('/books')
    books.value = res.data
  } catch (error) {
    console.error("Error al cargar:", error)
  }
}

onMounted(() => cargarLibros())

const borrarLibro = async (id) => {
  if (confirm(`¿Seguro que quieres borrar el libro con ID ${id}?`)) {
    try {
      await api.delete(`/books/${id}`)
      await cargarLibros() 
      alert('Libro borrado correctamente')
    } catch (error) {
      alert('Error al borrar: ' + error.message)
    }
  }
}
</script>