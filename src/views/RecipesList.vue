<template>
  <div>
    <v-list>
      <div
        class="listItem"
        v-for="recipe in recipes.slice().reverse()"
        :key="recipe.id"
      >
        <v-list-item @click="showComplete = !showComplete">
          <v-list-item-content>
            <v-list-item-title> {{ recipe.name }}</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-menu
              bottom
              origin="center center"
              transition="scale-transition"
              rounded="lg"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-icon v-bind="attrs" v-on="on"> mdi-dots-vertical </v-icon>
              </template>
              <v-list>

                <!-- <v-dialog
                  v-model="dialog"
                  fullscreen
                  hide-overlay
                  transition="dialog-bottom-transition"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-list-item v-bind="attrs" v-on="on">
                      <v-list-item-title>{{ "Edit" }}</v-list-item-title>
                    </v-list-item>
                  </template>
                  <EditableRecipe :recipe="recipe"/>
                </v-dialog> -->

                <v-list-item>
                  <v-list-item-title>{{ "Edit" }}</v-list-item-title>
                </v-list-item>

                <v-list-item>
                  <v-list-item-title>{{ "Delete" }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </v-list-item-action>
        </v-list-item>
        <CompleteRecipe :recipe="recipe" v-if="showComplete==true"/>
        <v-divider></v-divider>
      </div>
    </v-list>
  </div>
</template>

<script>
// @ is an alias to /src
import EditableRecipe from "..//components/EditableRecipe.vue"
import CompleteRecipe from "..//components/CompleteRecipe.vue"

export default {
  name: "RecipesList",
  components: {EditableRecipe, CompleteRecipe},
  data() {
    return {
      recipes: Array,
      // dummy
      dialog: false,
      showComplete: false,
    };
  },
  created() {
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
      },
    ];
  },
};
</script>
