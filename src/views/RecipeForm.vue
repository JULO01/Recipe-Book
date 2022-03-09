<template>
  <div>
    <EditableRecipe :recipe="recipe" />
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
        dialogEnabled: Boolean,
      },
    };
  },
  created: function () {
    // get recipe id from firebase
    this.recipe.id = 1;
    this.recipe.name = "";
    this.recipe.preperation = "";
    this.recipe.ingredients = [];
    this.recipe.dialogEnabled = false;
  },
  methods: {},
};
</script>



<style scoped>
</style>