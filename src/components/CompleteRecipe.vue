// This component shows a complete recipe as a card, with it's title, avatar, ingredients, and description 

<template>
  <v-card class="mx-auto my-12" max-width="374" flat>
    <v-img :src="recipe.imageUrl"></v-img>

    <v-divider class="mx-4"></v-divider>

    <v-app-bar elevation="1">
      <v-toolbar-title class="text-h6 pl-0">
        {{ recipe.name }}
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <OptionsButton
        @edit-button-clicked="$emit('edit-button-clicked')"
        @delete-button-clicked="
          deleteRecipe(recipe), $emit('back-button-clicked')
        "
      />
    </v-app-bar>

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

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn @click="$emit('back-button-clicked')" color="error" class="mb-5">
        Back
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>

<script>
import OptionsButton from "@/components/OptionsButton.vue";
import { mapActions } from "vuex";

export default {
  name: "CompleteRecipe",
  components: {
    OptionsButton,
  },
  props: {
    recipe: {
      id: String,
      uid: String,
      name: String,
      ingredients: Array,
      preperation: String,
      imageUrl: String,
    },
  },
  methods: {
    ...mapActions(["deleteRecipe"]),
  },
};
</script>

<style scoped>
</style>