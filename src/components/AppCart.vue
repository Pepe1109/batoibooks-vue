<template>
  <section id="cart">
    <h2 style="text-align: center; margin-bottom: 2rem;">Tu Carrito</h2>
    
    <div v-if="cart.length > 0">
      <div class="book-grid">
        <BookItem 
          v-for="book in cart" 
          :key="book.id" 
          :book="book"
        >
          <template #buttons>
            <button 
              @click="$emit('remove-from-cart', book.id)" 
              title="Sacar del carrito"
            >❌</button>
          </template>
        </BookItem>
      </div>

      <div class="totals" style="flex-direction: column; align-items: center; gap: 1rem;">
        <p>Total libros a comprar: <strong>{{ cart.length }}</strong></p>
        <p>Importe total: <strong>{{ totalImport }} €</strong></p>
        
        <div style="display: flex; gap: 1rem; margin-top: 1rem;">
          <button @click="handleVaciar" style="background-color: var(--text-muted); color: white;">Vaciar carrito</button>
          <button @click="handleCompra" style="background-color: var(--success-text); color: white;">Realizar compra</button>
        </div>
      </div>
    </div>
    
    <div v-else style="text-align: center;">
      <p>El carrito está vacío.</p>
      <button @click="$router.push('/')" style="margin-top: 1rem; background-color: var(--primary-color); color: white;">Volver a la tienda</button>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import BookItem from './BookItem.vue'

const props = defineProps({
  cart: {
    type: Array,
    required: true
  }
})

const emit = defineEmits(['remove-from-cart', 'clear-cart'])

const totalImport = computed(() => {
  return props.cart.reduce((acc, book) => acc + Number(book.price), 0).toFixed(2)
})

const handleVaciar = () => {
  if (confirm('¿Estás seguro de vaciar todo el carrito?')) {
    emit('clear-cart')
  }
}

const handleCompra = () => {
  // Simulando la pasarela de pago como pide la práctica
  const firstDigit = parseInt(String(totalImport.value)[0])
  
  if (firstDigit < 5) {
    alert("❌ Error: La transacción ha fallado (simulación API, número inicial < 5)")
  } else {
    alert("✅ Compra realizada con éxito")
    emit('clear-cart') // Vacía el carrito si tiene éxito
  }
}
</script>