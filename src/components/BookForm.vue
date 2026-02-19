<template>
  <section id="form">
    <form @submit.prevent="guardarLibro">
      <h2>{{ isEditing ? 'Editar libro' : 'Añadir libro' }}</h2>
      
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
        <label>Editorial:</label>
        <div>
          <label><input type="radio" v-model="formData.publisher" value="Apunts"> Apunts</label>
          <label><input type="radio" v-model="formData.publisher" value="McGraw-Hill"> McGraw-Hill</label>
        </div>
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
        <label>Estado:</label>
        <div>
          <label><input type="radio" v-model="formData.status" value="good"> Bueno</label>
          <label><input type="radio" v-model="formData.status" value="bad"> Malo</label>
        </div>
      </div>

      <div>
        <label>Comentarios:</label>
        <input type="text" v-model="formData.comments">
      </div>

      <button type="submit">{{ isEditing ? 'Modificar' : 'Añadir' }}</button>
      <button type="button" @click="resetForm">Reset</button>
    </form>
  </section>
</template>

<script setup>
import { reactive, ref, onMounted, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '../services/api'

const route = useRoute()
const router = useRouter()
const modules = ref([])
const isEditing = computed(() => !!route.params.id)

const initialData = {
  id: '', userId: 2, moduleCode: '', publisher: 'Apunts',
  price: 0, pages: 0, status: 'good', comments: '', soldDate: '', photo: ''
}

const formData = reactive({ ...initialData })

const loadData = async () => {
  const modRes = await api.get('/modules')
  modules.value = modRes.data

  if (isEditing.value) {
    const res = await api.get(`/books/${route.params.id}`)
    Object.assign(formData, res.data)
  } else {
    Object.assign(formData, initialData)
  }
}

onMounted(() => loadData())
watch(() => route.params.id, () => loadData())

const guardarLibro = async () => {
  try {
    if (isEditing.value) {
      await api.patch(`/books/${route.params.id}`, formData)
      alert('Libro modificado correctamente')
    } else {
      const res = await api.get('/books')
      const maxId = res.data.length > 0 ? Math.max(...res.data.map(b => parseInt(b.id) || 0)) : 0
      formData.id = String(maxId + 1)
      await api.post('/books', formData)
      alert('Libro añadido correctamente')
    }
    router.push('/')
  } catch (error) {
    alert('Error al guardar: ' + error.message)
  }
}

const resetForm = () => loadData()
</script>