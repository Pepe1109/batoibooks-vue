import { createRouter, createWebHistory } from 'vue-router'
import BooksList from '../components/BooksList.vue'
import BookForm from '../components/BookForm.vue'
import AppAbout from '../components/AppAbout.vue'
import AppCart from '../components/AppCart.vue' // <-- Nuevo componente

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'books', component: BooksList },
    { path: '/add', name: 'add-book', component: BookForm },
    { path: '/edit/:id', name: 'edit-book', component: BookForm },
    { path: '/cart', name: 'cart', component: AppCart },
    { path: '/about', name: 'about', component: AppAbout }
  ]
})

export default router