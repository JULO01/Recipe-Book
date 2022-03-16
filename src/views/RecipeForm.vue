<template>
  <div>
    <LoginDialog :enabled="!isLoggedIn" />
    <EditableRecipe class="mt-3" :recipe="recipe" :useRouter="true" />
  </div>
</template>

<script>
import LoginDialog from "@/components/LoginDialog.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import EditableRecipe from "..//components/EditableRecipe.vue";

export default {
  name: "RecipeForm",
  components: {
    EditableRecipe,
    LoginDialog,
  },
  data() {
    return {
      recipe: {
        id: Number,
        name: String,
        preperation: String,
        ingredients: Array,
      },
      // has to be written in store
      isLoggedIn: Boolean,
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