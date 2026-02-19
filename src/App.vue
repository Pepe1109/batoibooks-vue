<template>
  <div id="app">
    <header>
      <h1>BatoiBooks</h1>
    </header>

    <AppMenu :cart-count="cart.length" />

    <main>
      <router-view 
        :cart="cart"
        @add-to-cart="addToCart"
        @remove-from-cart="removeFromCart"
        @clear-cart="clearCart"
      />
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import AppMenu from './components/AppMenu.vue'
import './assets/main.css'

const cart = ref([])

// 1. Cargar carrito del LocalStorage al iniciar la app
onMounted(() => {
  const savedCart = localStorage.getItem('batoibooks_cart')
  if (savedCart) {
    try {
      cart.value = JSON.parse(savedCart)
    } catch (e) {
      console.error("Error leyendo carrito", e)
    }
  }
})

// 2. Auto-guardar en LocalStorage cada vez que cambia
watch(cart, (newCart) => {
  localStorage.setItem('batoibooks_cart', JSON.stringify(newCart))
}, { deep: true })

// 3. Métodos del carrito
const addToCart = (book) => {
  if (!cart.value.some(b => b.id === book.id)) {
    cart.value.push(book)
    alert('Libro añadido al carrito 🛒')
  }
}

const removeFromCart = (id) => {
  cart.value = cart.value.filter(b => b.id !== id)
}

const clearCart = () => {
  cart.value = []
}
</script>