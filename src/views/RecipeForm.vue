<template>
  <div>
    <EditableRecipe class="mt-3" :recipe="recipe" :useRouter="true" />
  </div>
</template>

<script>
import { getAuth, onAuthStateChanged } from "firebase/auth";
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
    this.recipe.id = 1;
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