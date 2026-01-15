import { defineStore } from 'pinia'
import api from '../services/api' // Importamos la instancia de axios

export const useBooksStore = defineStore('books', {
  // state: equivale al 'this.data = []' del constructor de tu clase Books
  state: () => ({
    books: [],
    loading: false
  }),
  
  // getters: equivalen a métodos que calculan cosas, como 'totalImport' que piden los apuntes
  getters: {
    totalBooks: (state) => state.books.length,
    totalPrice: (state) => state.books.reduce((acc, book) => acc + book.price, 0).toFixed(2)
  },

  // actions: equivalen a los métodos async de tu clase (populate, addBook, removeBook)
  actions: {
    async fetchBooks() {
      this.loading = true
      try {
        const response = await api.get('/books')
        this.books = response.data
      } catch (error) {
        console.error("Error fetching books:", error)
      } finally {
        this.loading = false
      }
    },
    
    async removeBook(id) {
        // Confirmación
        const book = this.books.find(b => b.id === id)
        if(book && confirm(`¿Seguro que quieres borrar el libro del módulo ${book.moduleCode}?`)) {
             try {
                await api.delete(`/books/${id}`)
                // Actualizamos el estado local filtrando el libro borrado
                this.books = this.books.filter(b => b.id !== id)
             } catch (error) {
                console.error("Error deleting book:", error)
             }
        }
    }
    // Aquí añadirías addBook más adelante
  }
})