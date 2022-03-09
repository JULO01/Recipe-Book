<template>
  <div class="form">
    <v-form ref="form" lazy-validation>
      <v-text-field
        v-model="recipe.name"
        label="Recipe Title"
        @keydown.enter.prevent="$nextTick(() => $refs.ingredientInput.focus())"
      ></v-text-field>

      <v-text-field
        @click:append="addIngredient(ingredient)"
        @keydown.enter.prevent="addIngredient(ingredient)"
        v-model="ingredient"
        label="Ingredients"
        append-icon="mdi-plus"
        ref="ingredientInput"
      ></v-text-field>

      <v-list>
        <div
          v-for="ingredient in recipe.ingredients.slice().reverse()"
          :key="ingredient.id"
        >
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> {{ ingredient.name }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-action>
              <v-btn icon>
                <v-icon
                  @click="deleteIngredient(ingredient.id)"
                  color="red accent-2"
                  >mdi-delete-forever</v-icon
                >
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider class="mx-4"></v-divider>
        </div>
      </v-list>

      <v-textarea
        v-model="recipe.preperation"
        label="Preperation"
        ref="preperationInput"
        @keydown.enter.prevent="$refs.fileInput.focus()"
      ></v-textarea>

      <v-file-input
        truncate-length="15"
        accept="image/*"
        label="Add picture"
        ref="fileInput"
      ></v-file-input>

      <div class="buttons">
        <v-spacer></v-spacer>
        <v-btn color="success" class="mr-4"> Save </v-btn>
        <v-btn @click="goBack()" color="error" class="mr-4"> Back </v-btn>
        <v-spacer></v-spacer>
      </div>
    </v-form>

    <Dialog
      :text="'Really want to leave?'"
      :acceptButtonText="'Leave'"
      :declineButtonText="'Stay here'"
      :enabled="dialogEnabled"
      @accepted="$router.push('/')"
      @declined="dialogEnabled = false"
    />
  </div>
</template>

<script>
import Dialog from "..//components/Dialog.vue";

export default {
  name: "EditableRecipe",
  components: {
    Dialog,
  },
  props: {
    recipe: {
      id: Number,
      name: String,
      ingredients: Array,
      preperation: String,
      imageUrl: String,
    },
  },

  data() {
    return {
      ingredient: String,
      ingredientId: Number,
      dialogEnabled: Boolean,
    };
  },

  created() {
    //   this.ingredientId has to be length of property ingredients, to prevent duplicate ingredient id's
    this.ingredient = "";
    this.ingredientId = this.recipe.ingredients.length;
    this.dialogEnabled = false;
  },

  methods: {
    addIngredient(ingredientName) {
      if (ingredientName === "") {
        return;
      }

      const ingredientItem = {
        id: this.ingredientId,
        name: ingredientName,
      };
      this.recipe.ingredients.push(ingredientItem);
      this.ingredientId++;
      this.ingredient = "";
    },
    deleteIngredient(id) {
      this.recipe.ingredients = this.recipe.ingredients.filter((ingredient) => {
        return ingredient.id !== id;
      });
    },
    saveRecipe(recipe) {
      // Push recipe to firebase and check if there is already a recipe with this id --> then update the existing recipe
      return;
    },
    goBack() {
      // Need to bind and check the attached picture in if statement
      if (
        this.recipe.ingredients.length == 0 &&
        this.recipe.name == "" &&
        this.recipe.preperation == ""
      ) {
        this.$router.push("/");
      } else {
        this.dialogEnabled = true;
      }
    },
  },
};
</script>

<style scoped>
.form {
  padding: 20px;
}

.buttons {
  display: flex;
}
</style>