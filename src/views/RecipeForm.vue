<template>
  <div class="form">
    <v-form ref="form" lazy-validation>
      <v-text-field v-model="name" label="Recipe Title"></v-text-field>

      <v-text-field
        @click:append="addIngredient(ingredient)"
        v-model="ingredient"
        label="Ingredients"
        append-icon="mdi-plus"
      ></v-text-field>
      <!-- v-list is a dummy, it will get dynamic by putting a v-for with this.ingredients in it -->
      <v-list>
        <div
          class="listItem"
          v-for="ingredient in ingredients"
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
                  color="red darken-4"
                  >mdi-delete-forever</v-icon
                >
              </v-btn>
            </v-list-item-action>
          </v-list-item>
          <v-divider></v-divider>
        </div>
      </v-list>

      <v-textarea v-model="preperation" label="Preperation"></v-textarea>

      <v-file-input
        truncate-length="15"
        accept="image/*"
        label="Add picture"
      ></v-file-input>

      <div class="buttons">
        <v-spacer></v-spacer>
        <v-btn color="success" class="mr-4"> Save </v-btn>

        <v-btn @click="goBack()" color="error" class="mr-4">
          Back
        </v-btn>
        <v-spacer></v-spacer>
      </div>
    </v-form>

    <Dialog
      :text="'Are you sure, that you want to leave?'"
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
  name: "RecipeForm",
  components: {
    Dialog,
  },
  data() {
    return {
      name: String,
      ingredient: String,
      preperation: String,
      ingredients: Array,
      ingredientId: Number,
      dialogEnabled: Boolean,
    };
  },
  created: function () {
    this.name = "";
    this.ingredient = "";
    this.preperation = "";
    this.ingredients = [];
    this.ingredientId = 1;
    this.dialogEnabled = false;
  },
  methods: {
    addIngredient(ingredientName) {
      if (ingredientName === "") {
        return;
      }

      const ingredientItem = { id: this.ingredientId, name: ingredientName };
      this.ingredients.push(ingredientItem);
      this.ingredientId++;
      this.ingredient = "";
    },
    deleteIngredient(id) {
      this.ingredients = this.ingredients.filter((ingredient) => {
        return ingredient.id !== id;
      });
    },
    saveRecipe(recipe) {
      // Push recipe to firebase
      return;
    },
    goBack(){
      // Need to bind and check the attached picture in if statement
      if(this.ingredients.length == 0 && this.name == "" && this.preperation == ""){
        this.$router.push('/');
      }
      else{
        console.log("isenabled");
        this.dialogEnabled = true;
        console.log(this.dialogEnabled);
      }
    }
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