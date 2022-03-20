<template>
  <div>
    <CompleteRecipe
      v-if="!completeRecipeHidden"
      :recipe="bufferedRecipe"
      @edit-button-clicked="showEditableRecipe(bufferedRecipe)"
      @back-button-clicked="(completeRecipeHidden = true)"
    />
    <EditableRecipe
      v-if="!editableRecipeHidden"
      :recipe="bufferedRecipe"
      :recipeExists="true"
      @closing="closeEditableRecipe()"
    />
    <v-list class="mt-8" v-if="completeRecipeHidden && editableRecipeHidden">
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
import { mapActions, mapState } from "vuex";

export default {
  name: "RecipesList",
  components: { EditableRecipe, CompleteRecipe, OptionsButton },
  data() {
    return {
      bufferedRecipe: Object,
      completeRecipeHidden: Boolean,
      editableRecipeHidden: Boolean,
    };
  },
  created() {
    this.completeRecipeHidden = true;
    this.editableRecipeHidden = true;
  },
  methods: {
    ...mapActions(["getOwnRecipes", "deleteRecipe"]),

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
  },
  computed: {
    ...mapState(["ownRecipes"]),
  },
};
</script>
