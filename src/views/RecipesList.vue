<template>
  <div>
    <LoginDialog :enabled="!isLoggedIn" />
    <CompleteRecipe
      v-if="!completeRecipeHidden"
      :recipe="bufferedRecipe"
      @edit-button-clicked="showEditableRecipe(bufferedRecipe)"
      @back-button-clicked="completeRecipeHidden = true"
    />
    <EditableRecipe
      v-if="!editableRecipeHidden"
      :recipe="bufferedRecipe"
      @closing="closeEditableRecipe()"
    />
    <v-list class="mt-5" v-if="completeRecipeHidden && editableRecipeHidden">
      <div
        class="listItem"
        v-for="recipe in recipes.slice().reverse()"
        :key="recipe.id"
      >
        <v-list-item @click="showCompleteRecipe(recipe)">
          <v-list-item-content>
            <v-list-item-title> {{ recipe.name }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <OptionsButton @edit-button-clicked="showEditableRecipe(recipe)" />
          </v-list-item-action>
        </v-list-item>
        <v-divider class="mx-4"></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script>
// @ is an alias to /src
import EditableRecipe from "@/components/EditableRecipe.vue";
import CompleteRecipe from "@/components/CompleteRecipe.vue";
import OptionsButton from "@/components/OptionsButton.vue";
import LoginDialog from "@/components/LoginDialog.vue";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default {
  name: "RecipesList",
  components: { EditableRecipe, CompleteRecipe, OptionsButton, LoginDialog },
  data() {
    return {
      bufferedRecipe: Object,
      completeRecipeHidden: Boolean,
      editableRecipeHidden: Boolean,
      // dummy
      recipes: Array,
      isLoggedIn: Boolean,
      uid: String,
    };
  },
  created() {
    this.completeRecipeHidden = true;
    this.editableRecipeHidden = true;
    this.uid = this.uid = getAuth().currentUser.uid;
    // dummy
    this.getRecipes()
    this.recipes = [
      {
        id: 1,
        name: "Spaghetti",
        ingredients: [
          {
            id: 1,
            name: "Spaghetti Noodles",
          },
          {
            id: 2,
            name: "Cream",
          },
        ],
        preperation: "Boil the spaghettis and eat",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/4/47/Hamburger_%28black_bg%29.jpg",
      },
      {
        id: 2,
        name: "Pizza",
        ingredients: [
          {
            id: 1,
            name: "Pizza Teig",
          },
          {
            id: 2,
            name: "Spices",
          },
        ],
        preperation: "Cook the pizza and eat",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/4/47/Hamburger_%28black_bg%29.jpg",
      },
    ];
  },
  methods: {
    showCompleteRecipe(recipe) {
      this.bufferedRecipe = {
        id: recipe.id,
        name: recipe.name,
        ingredients: recipe.ingredients,
        preperation: recipe.preperation,
        imageUrl: recipe.imageUrl,
      };
      this.editableRecipeHidden = true;
      this.completeRecipeHidden = false;
    },

    showEditableRecipe(recipe) {
      this.bufferedRecipe = {
        id: recipe.id,
        name: recipe.name,
        ingredients: recipe.ingredients,
        preperation: recipe.preperation,
        imageUrl: recipe.imageUrl,
      };
      this.completeRecipeHidden = true;
      this.editableRecipeHidden = false;
    },

    closeEditableRecipe() {
      this.editableRecipeHidden = true;
    },
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

    async getRecipes() {
      const db = getFirestore();
      const docRef = doc(db, "recipes");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    },
  },
};
</script>
