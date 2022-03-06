<template>
  <div class="form">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field v-model="name" label="Recipe Title"></v-text-field>

      <v-text-field v-model="ingredients" label="Ingredients"></v-text-field>

      <v-textarea v-model="preperation" label="Preperation"></v-textarea>

      <v-file-input truncate-length="15" accept="image/*"
    label="Add picture"></v-file-input>

      <div class="buttons">
        <v-spacer></v-spacer>
        <v-btn color="success" class="mr-4"> Save </v-btn>

        <v-btn color="error" class="mr-4"> Back </v-btn>
        <v-spacer></v-spacer>
      </div>
    </v-form>
  </div>
</template>

<style scoped>
.form {
  padding: 20px;
}

.buttons {
  display: flex;
}
</style>