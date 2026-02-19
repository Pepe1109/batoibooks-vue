<template>
  <nav>
    <ul>
      <li><router-link to="/">Ver Libros</router-link></li>
      <li><router-link to="/add">Nuevo Libro</router-link></li>
      <li><router-link to="/cart">Carrito ({{ cartCount }})</router-link></li>
      <li><router-link to="/about">Acerca de...</router-link></li>
    </ul>
  </nav>
</template>

<script setup>
defineProps({
  cartCount: {
    type: Number,
    default: 0
  }
})
</script>