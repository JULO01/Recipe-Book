<template>
  <div class="card">
    <v-card class="mx-auto my-12" max-width="374">
      <v-img
        height="250"
        src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
      ></v-img>
      <v-card-title>Cafe Badilico</v-card-title>

      <v-card-text>
        <v-row align="center" class="mx-0"> </v-row>

        <div class="my-4 text-subtitle-1">Italian, Cafe</div>

        <div>
          Small plates, salads & sandwiches - an intimate setting with 12 indoor
          seats plus patio seating.
        </div>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="deep-purple lighten-2" text @click="reserve">
          Save
        </v-btn>
        <v-btn color="deep-purple lighten-2" text @click="reserve">
          Discard
        </v-btn>
        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  name: "RandomRecipe",
};
</script>

<style scoped>
.card{
    margin: 20px;
}
</style>