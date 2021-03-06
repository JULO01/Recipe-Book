// This component shows a complete Recipe as in editable mode, so the title, avatar image, description and ingredients can be set and 
// pushed to firebase

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

      <v-list class="mt-n6 mb-2">
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

      <input
        ref="fileInput"
        class="d-none"
        type="file"
        accept="image/*"
        @change="onFileChange"
      />

      <v-container>
        <div
          v-if="!imagePresent"
        >
          <v-row justify="space-around">
            <v-btn
              :loading="isSelecting"
              color="darkgrey"
              icon
              @click="handleFileInput()"
            >
              <v-icon size="40">mdi-plus</v-icon>
            </v-btn>
          </v-row>
          <v-row justify="space-around">
            <div class="subtitle-1 mb-10" color="darkgrey">Add Image</div>
          </v-row>
        </div>

        <div v-if="imagePresent">
          <v-row justify="space-around">
            <v-card max-width="200" class="mb-8 mt-5">
              <v-img :src="recipe.imageUrl">
                <v-app-bar flat color="rgba(0, 0, 0, 0)">
                  <v-spacer></v-spacer>
                  <v-btn
                    color="white"
                    icon
                    class="mt-n3 mr-n5"
                    @click="deleteImageButtonClicked(recipe)"
                  >
                    <v-icon size="25">mdi-close</v-icon>
                  </v-btn>
                </v-app-bar>
              </v-img>
            </v-card>
          </v-row>
        </div>

        <v-row justify="space-around">
          <v-spacer></v-spacer>
          <v-btn
            @click="saveRecipe(recipe, image)"
            color="success"
            class="mr-2"
          >
            Save
          </v-btn>
          <v-btn
            @click="goBack({ checkInputs: true })"
            color="error"
            class="ml-2"
          >
            Back
          </v-btn>
          <v-spacer></v-spacer>
        </v-row>
      </v-container>
    </v-form>

    <LeaveDialog
      :text="'Really want to leave?'"
      :acceptButtonText="'Stay here'"
      :declineButtonText="'Leave'"
      :enabled="dialogEnabled"
      @accepted="dialogEnabled = false"
      @declined="goBack({ checkInputs: false })"
    />
  </div>
</template>

<script>
import LeaveDialog from "./LeaveDialog.vue";
import { mapActions } from "vuex";

export default {
  name: "EditableRecipe",
  components: {
    LeaveDialog,
  },
  props: {
    recipe: {
      name: String,
      ingredients: Array,
      preperation: String,
      imageUrl: String,
    },
    recipeExists: Boolean,
  },

  data() {
    return {
      ingredient: String,
      ingredientId: Number,
      dialogEnabled: Boolean,
      image: undefined,
      isSelecting: false,
      imagePresent: false,
    };
  },

  created() {
    this.ingredient = "";
    this.ingredientId = this.recipe.ingredients.length;
    this.dialogEnabled = false;
    if(this.recipeExists && this.recipe.imageUrl){
      this.imagePresent = true;      
    }
  },

  methods: {
    ...mapActions(["addRecipe", "updateRecipe", "deleteImage"]),
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
    saveRecipe(recipe, image) {
      // Push recipe to firebase and check if there is already a recipe with this id --> then update the existing recipe
      if (this.recipeExists) {
        this.updateRecipe(recipe);
      } else {
        this.addRecipe({ recipe, image });
      }

      this.goBack({ checkInputs: false });
    },

    // pushes the router back to the home view (recipesList)
    goBack({ checkInputs = true } = {}) {
      // Need to bind and check the attached picture in if statement
      if (checkInputs) {
        if (
          this.recipe.ingredients.length == 0 &&
          this.recipe.name == "" &&
          this.recipe.preperation == ""
        ) {
          if (this.$route.name == "RecipeForm") {
            this.$router.push("/");
          }
          this.$emit("closing");
        } else {
          this.dialogEnabled = true;
        }
      } else {
        if (this.$route.name == "RecipeForm") {
          this.$router.push("/");
        }
        this.$emit("closing");
      }
    },
    handleFileInput() {
      this.isSelecting = true;
      window.addEventListener(
        "focus",
        () => {
          this.isSelecting = false;
        },
        { once: true }
      );
      this.$refs.fileInput.click();
    },

    onFileChange(e) {
      const image = e.target.files[0];
      this.recipe.imageUrl = URL.createObjectURL(image);
      this.image = image;
      this.imagePresent = true;
      console.log(this.recipe.imageUrl);
    },

    deleteImageButtonClicked(recipe) {
      if (this.recipe.id) {
        this.deleteImage(recipe);
        console.log("dsjfdks")
      }
      if (this.image) {
        this.image = undefined;
      }
      this.recipe.imageUrl = undefined;
      this.imagePresent = false;
    },
  },
};
</script>

<style lang="sass" scoped>
.form
  padding: 20px

$list-padding: 0px 0px
</style>
