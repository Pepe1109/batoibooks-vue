<template>
  <section id="form">
    <h2>Añadir libro</h2>
    <form @submit.prevent="handleSubmit">
      <div>
        <label>ID Usuario:</label>
        <input type="number" v-model="formData.userId" required>
      </div>

      <div>
        <label>Módulo:</label>
        <select v-model="formData.moduleCode" required>
          <option value="" disabled>Selecciona un módulo</option>
          <option v-for="mod in modules" :key="mod.code" :value="mod.code">
            {{ mod.cliteral }} ({{ mod.code }})
          </option>
        </select>
      </div>

      <div>
        <p>Editorial:</p>
        <label><input type="radio" v-model="formData.publisher" value="Apunts"> Apunts</label>
        <label><input type="radio" v-model="formData.publisher" value="McGraw-Hill"> McGraw-Hill</label>
      </div>

      <div>
        <label>Precio:</label>
        <input type="number" step="0.01" v-model.number="formData.price" required>
      </div>

      <div>
        <label>Páginas:</label>
        <input type="number" v-model.number="formData.pages" required>
      </div>

      <div>
        <p>Estado:</p>
        <label><input type="radio" v-model="formData.status" value="good"> Bueno</label>
        <label><input type="radio" v-model="formData.status" value="bad"> Malo</label>
      </div>

      <div>
        <label>Comentarios:</label>
        <input type="text" v-model="formData.comments">
      </div>

      <button type="submit">Guardar</button>
      <button type="button" @click="resetForm">Reset</button>
    </form>
  </section>
</template>

<script setup>
import { reactive } from 'vue'

// Recibimos los módulos desde App.vue
defineProps({
  modules: Array
})

const emit = defineEmits(['add'])

const initialData = {
  userId: 2,
  moduleCode: '',
  publisher: 'Apunts',
  price: 0,
  pages: 0,
  status: 'good',
  comments: ''
}

const formData = reactive({ ...initialData })

const handleSubmit = () => {
  // Enviamos una copia de los datos al padre
  emit('add', { ...formData })
  resetForm()
}

const resetForm = () => {
  Object.assign(formData, initialData)
}
</script>