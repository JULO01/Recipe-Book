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
        id: Number,
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