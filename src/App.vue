<template>
  <div class="container">
    <header>
      <h1>Batoibooks</h1>
    </header>

    <AppMenu />

    <AppMessages :messages="messages" @close="removeMessage" />

    <main>
      <BookForm :modules="modules" @add="handleAddBook" />

      <BooksList :books="books" @remove="handleRemoveBook" />

      <AppAbout />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import api from './services/api'

// Importación de componentes
import AppMenu from './components/AppMenu.vue'
import AppMessages from './components/AppMessages.vue'
import BookForm from './components/BookForm.vue'
import BooksList from './components/BooksList.vue'
import AppAbout from './components/AppAbout.vue'
// Estilos globales
import './assets/main.css'

// --- ESTADO (Datos) ---
const books = ref([])
const modules = ref([])
const messages = ref([])

// --- LOGICA / MÉTODOS ---

// Función auxiliar para añadir mensajes
const addMessage = (text, type = 'info') => {
  const id = Date.now()
  messages.value.push({ id, text, type })
  // Autocierre a los 3 segundos
  setTimeout(() => removeMessage(id), 3000)
}

const removeMessage = (id) => {
  messages.value = messages.value.filter(m => m.id !== id)
}

// Cargar datos al iniciar
onMounted(async () => {
  try {
    const [booksRes, modulesRes] = await Promise.all([
      api.get('/books'),
      api.get('/modules')
    ])
    books.value = booksRes.data
    modules.value = modulesRes.data
  } catch (error) {
    addMessage('Error al cargar datos del servidor', 'error')
    console.error(error)
  }
})

// Añadir libro
const handleAddBook = async (bookData) => {
  try {
    // Calculamos ID (simulado, idealmente lo hace el server)
    const maxId = books.value.length > 0 
      ? Math.max(...books.value.map(b => Number(b.id))) 
      : 0
    const newBookPayload = { ...bookData, id: String(maxId + 1) }

    // API POST
    const response = await api.post('/books', newBookPayload)
    
    // Actualizamos localmente
    books.value.push(response.data)
    addMessage(`Libro añadido correctamente (id: ${response.data.id})`, 'success')
  } catch (error) {
    addMessage('Error al guardar el libro: ' + error.message, 'error')
  }
}

// Borrar libro
const handleRemoveBook = async (id) => {
  const book = books.value.find(b => b.id === id)
  if (!book) return

  // Confirmación requerida en el enunciado
  if (confirm(`¿Seguro que deseas eliminar el libro con id ${id} del módulo ${book.moduleCode}?`)) {
    try {
      // API DELETE
      await api.delete(`/books/${id}`)
      
      // Actualizamos localmente
      books.value = books.value.filter(b => b.id !== id)
      addMessage(`Libro ${id} eliminado correctamente`, 'info')
    } catch (error) {
      addMessage('No se pudo borrar el libro: ' + error.message, 'error')
    }
  }
}
</script>