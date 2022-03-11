<template>
  <v-card>
    <v-card-title class="text-h5"> {{actionText}} </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="email"
          label="Email"
          required
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          required
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-subtitle class="text-center mt-n8 red--text"></v-card-subtitle>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        class="mt-n3 mb-5"
        color="primary"
        dark
        @click="$emit('action-button-clicked')"
      >
        {{ actionText }}
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>

    <v-divider class="mx-4 mb-3"></v-divider>

    <v-card-subtitle class="text-center">
      {{ subtitleText }}
      <br/>
      <a @click="$emit('subtitle-link-clicked')">
        {{ subtitleLinkText }}
      </a></v-card-subtitle
    >
  </v-card>
</template>

<script>
export default {
  name: "LoginForm",
  props: {
    actionText: String,
    subtitleText: String,
    subtitleLinkText: String,
  },
  data() {
    return {
      email: String,
      password: String,
    };
  },
  created() {
    this.email = "";
    this.password = "";
  },
};
</script>

<style scoped>
</style>