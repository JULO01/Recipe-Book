// This component renders an empty, editable recipe, to let the user add his own recipes to his list.

<template>
  <div>
    <EditableRecipe class="mt-3" :recipe="recipe" :recipeExists="false"/>
  </div>
</template>

<script>
import EditableRecipe from "..//components/EditableRecipe.vue";

export default {
  name: "RecipeForm",
  components: {
    EditableRecipe,
  },
  data() {
    return {
      recipe: {
        name: String,
        preperation: String,
        ingredients: Array,
      },
    };
  },
  created() {
    // get recipe id from firebase
    this.recipe.name = "";
    this.recipe.preperation = "";
    this.recipe.ingredients = [];
  },
  methods: {
  },
};
</script>



<style scoped>
</style>