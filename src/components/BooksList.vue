<template>
  <section id="list">
    <div class="book-grid">
      <BookItem 
        v-for="book in books" 
        :key="book.id" 
        :book="book"
        @remove="borrarLibro"
        @edit="$router.push(`/edit/${book.id}`)"
      />
    </div>

    <div class="totals" v-if="books.length > 0">
      <p>Total de libros: <strong>{{ books.length }}</strong></p>
    </div>
    <p v-else style="text-align: center;">No hay libros disponibles.</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from '../services/api'
import BookItem from './BookItem.vue'

const books = ref([])

const cargarLibros = async () => {
  try {
    const res = await api.get('/books')
    books.value = res.data
  } catch (error) {
    console.error("Error al cargar:", error)
  }
}

onMounted(() => {
  cargarLibros()
})

const borrarLibro = async (id) => {
  if (confirm(`¿Seguro que quieres borrar el libro con ID ${id}?`)) {
    try {
      await api.delete(`/books/${id}`)
      await cargarLibros() // Recarga automática
      alert('Libro borrado correctamente')
    } catch (error) {
      alert('Error al borrar: ' + error.message)
    }
  }
}
</script>