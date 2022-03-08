<template>
  <v-list>
    <div class="listItem" v-for="recipe in recipes" :key="recipe.id">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title> {{ recipe.name }}</v-list-item-title>
        </v-list-item-content>
        <v-list-item-action>
          <v-btn icon>
            <!-- three dots with action to delete or edit -->
            <v-icon color="red darken-4">mdi-delete-forever</v-icon>
          </v-btn>
        </v-list-item-action>
      </v-list-item>
      <v-divider></v-divider>
    </div>
  </v-list>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: "RecipesList",
  components: {},
  data() {
    return {
      recipes: Array,
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
