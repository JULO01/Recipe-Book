// This component shows a random recipe from the randommealsapi as a card. It lets the user discard the random recipe (a new one will be
// shown) or save the recipe (will be pushed to firebase)

<template>
  <div>
    <div class="card">
      <v-card class="mx-auto my-12" max-width="374" rounded="lg" elevation="24">
        <v-img height="250" :src="randomRecipe.imageUrl"></v-img>
        <v-card-title>{{ randomRecipe.name }}</v-card-title>
        <v-card-text>
          <v-row align="center" class="mx-0"> </v-row>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green" text @click="saveRecipe()"> Save </v-btn>
          <v-btn color="red accent-2" text @click="discardRecipe()">
            Discard
          </v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </div>
  </div>
</template>

<script>
import {mapActions} from "vuex"
import { getFirestore, collection, addDoc } from "firebase/firestore";

export default {
  name: "RandomRecipe",
  data() {
    return {
      randomRecipe: Object,
    };
  },
  components: {},
  methods: {
    ...mapActions(["addRecipe"]),
    getRandomRecipe() {
      const url = "https://www.themealdb.com/api/json/v1/1/random.php";
      const recipeObservable = fetch(url);

      recipeObservable
        .then((res) => {
          const apiResult = res.json();
          apiResult
            .then((res) => {
              const apiRecipe = res.meals[0];

              // get the relevant data out of the api json
              const id = apiRecipe.idMeal;
              const name = apiRecipe.strMeal;
              const preperation = apiRecipe.strInstructions;
              const imageUrl = apiRecipe.strMealThumb;
              const ingredients = [];

              // query the json for all ingredient and measure indexes and filter empty ones
              const ingredientIndex = "strIngredient";
              const measureIndex = "strMeasure";

              for (let i = 1; i <= 20; i++) {
                const ingredientId = i;
                const ingredientName =
                  apiRecipe[measureIndex + i] +
                  " " +
                  apiRecipe[ingredientIndex + i];

                const ingredient = {
                  id: ingredientId,
                  name: ingredientName,
                };

                if (ingredient.name !== " " && ingredient.name !== "  " && ingredient.name !== "") {
                  ingredients.push(ingredient);
                }
              }

              const recipe = {
                name: name,
                ingredients: ingredients,
                preperation: preperation,
                imageUrl: imageUrl,
              };

              this.randomRecipe = recipe;
            })
            .catch((err) => {
              console.log(`Error: ${err}`);
            });
        })
        .catch((err) => {
          console.log(`Error: ${err}`);
        });
    },
    saveRecipe() {
      const recipe = this.randomRecipe;
      const image = undefined;
      this.addRecipe({recipe, image});
      this.getRandomRecipe()
    },
    discardRecipe() {
      this.getRandomRecipe();
    },
    
  },
  created() {
    this.getRandomRecipe();

  },
};
</script>

<style scoped>
.card {
  margin: 20px;
}
</style>