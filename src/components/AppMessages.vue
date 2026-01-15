<template>
  <div id="messages">
    <div 
      v-for="msg in messages" 
      :key="msg.id" 
      :class="['alert', msg.type === 'error' ? 'alert-danger' : 'alert-info']"
    >
      {{ msg.text }}
      <button class="btn-close" @click="$emit('close', msg.id)">x</button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  messages: Array // Recibimos el array de mensajes del padre
})
defineEmits(['close'])
</script>

<style scoped>
.alert { padding: 1em; margin: 1em 0; border-radius: 5px; display: flex; justify-content: space-between; }
.alert-info { background-color: #d1ecf1; color: #0c5460; border: 1px solid #bee5eb; }
.alert-danger { background-color: #f8d7da; color: #721c24; border: 1px solid #f5c6cb; }
.btn-close { background: none; border: none; font-weight: bold; cursor: pointer; }
</style>