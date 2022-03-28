<template>
  <div>
    <CompleteRecipe
      v-if="!completeRecipeHidden"
      :recipe="bufferedRecipe"
      @edit-button-clicked="showEditableRecipe(bufferedRecipe)"
      @back-button-clicked="setCompleteRecipeHidden(true)"
    />
    <EditableRecipe
      v-if="!editableRecipeHidden"
      :recipe="bufferedRecipe"
      :recipeExists="true"
      @closing="closeEditableRecipe()"
    />

    <v-card flat v-if="ownRecipes.length == 0" class="mt-4">
      <div class="d-flex flex-column justify-space-between align-center">
        <v-img
          width="180"
          src="https://firebasestorage.googleapis.com/v0/b/recipe-book-5e2f4.appspot.com/o/assets%2Fempty-state.png?alt=media&token=ae17a028-036b-4fe4-a131-920a69122fb3"
        >
        </v-img>
      </div>

      <v-card-text>
        <div class="d-flex flex-column justify-space-between align-center">
          <p class="text-h4 text--primary mt-8">
            Seems like you don't have any recipes yet...
          </p>
        </div>
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn to="/random-recipe" text color="primary">
          Browse random recipes
        </v-btn>
      </v-card-actions>
    </v-card>

    <v-list
      class="mt-8"
      v-if="
        completeRecipeHidden && editableRecipeHidden && ownRecipes.length != 0
      "
    >
      <div
        class="listItem"
        v-for="recipe in ownRecipes.slice().reverse()"
        :key="recipe.id"
      >
        <v-list-item>
          <v-list-item-content @click="showCompleteRecipe(recipe)">
            <v-list-item-title> {{ recipe.name }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <OptionsButton
              @edit-button-clicked="showEditableRecipe(recipe)"
              @delete-button-clicked="deleteRecipe(recipe)"
            />
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
import { mapActions, mapMutations, mapState } from "vuex";

export default {
  name: "RecipesList",
  components: { EditableRecipe, CompleteRecipe, OptionsButton },
  data() {
    return {
      bufferedRecipe: Object,
    };
  },
  methods: {
    ...mapActions(["getOwnRecipes", "deleteRecipe"]),
    ...mapMutations(["setCompleteRecipeHidden", "setEditableRecipeHidden"]),

    showCompleteRecipe(recipe) {
      this.bufferedRecipe = {
        id: recipe.id,
        name: recipe.name,
        ingredients: recipe.ingredients,
        preperation: recipe.preperation,
        imageUrl: recipe.imageUrl,
      };
      this.setEditableRecipeHidden(true);
      this.setCompleteRecipeHidden(false);
    },

    showEditableRecipe(recipe) {
      this.bufferedRecipe = {
        id: recipe.id,
        name: recipe.name,
        ingredients: recipe.ingredients,
        preperation: recipe.preperation,
        imageUrl: recipe.imageUrl,
      };
      this.setCompleteRecipeHidden(true);
      this.setEditableRecipeHidden(false);
    },

    closeEditableRecipe() {
      this.setEditableRecipeHidden(true);
    },
  },
  computed: {
    ...mapState(["ownRecipes", "completeRecipeHidden", "editableRecipeHidden"]),
  },
};
</script>
