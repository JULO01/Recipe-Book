import Vue from 'vue'
import VueRouter from 'vue-router'
import RecipesList from '../views/RecipesList.vue'
import RecipeForm from '../views/RecipeForm.vue'
import RandomRecipe from '../views/RandomRecipe.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'RecipesList',
    component: RecipesList
  },
  {
    path: '/recipe-form',
    name: 'RecipeForm',
    component: RecipeForm
  },
  {
    path: '/random-recipe',
    name: 'RandomRecipe',
    component: RandomRecipe
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
