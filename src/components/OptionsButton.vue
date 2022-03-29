<template>
<div>
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
      <v-list-item @click.stop="$emit('edit-button-clicked')" class="edit">
        <v-list-item-title>{{ "Edit" }}</v-list-item-title>
      </v-list-item>

      <v-list-item @click.stop="$emit('delete-button-clicked')" class="error--text delete">
        <v-list-item-title>{{ "Delete" }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
  </div>
</template>

<script>
export default {
  name: "OptionsButton",
};
</script>