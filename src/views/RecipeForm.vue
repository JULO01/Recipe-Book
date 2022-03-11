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
      isLoggedIn: Boolean,
      uid: String,
    };
  },
  created() {
    // get recipe id from firebase
    this.recipe.id = 1;
    this.recipe.name = "";
    this.recipe.preperation = "";
    this.recipe.ingredients = [];
    this.uid = this.uid = getAuth().currentUser.uid;
    this.watchAuthStatus();
  },
  methods: {
    watchAuthStatus() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.uid = user.uid;
          this.isLoggedIn = true;
          // ...
        } else {
          this.isLoggedIn = false;
          // User is signed out
          // ...
        }
      });
    },
  },
};
</script>



<style scoped>
</style>