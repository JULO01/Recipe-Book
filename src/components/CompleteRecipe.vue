<template>
  <v-card class="mx-auto my-12" max-width="374">
    <v-img :src="recipe.imageUrl"></v-img>

    <v-card-title>{{ recipe.name }}</v-card-title>

    <v-divider class="mx-4"></v-divider>

    <v-card-title> Ingredients: </v-card-title>

    <v-list>
        <div
          v-for="ingredient in recipe.ingredients.slice().reverse()"
          :key="ingredient.id"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> {{ ingredient.name }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-divider class="mx-4"></v-divider>
        </div>
      </v-list>

    <v-card-title>Preperation:</v-card-title>

    <v-card-text>
      {{ recipe.preperation }}
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  name: "CompleteRecipe",
  props: {
      recipe: Object,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
</style>