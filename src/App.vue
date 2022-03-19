<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <div class="d-flex align-center">
        <v-img
          alt="Vuetify Logo"
          class="shrink mr-2"
          contain
          src="https://cdn.vuetifyjs.com/images/logos/vuetify-logo-dark.png"
          transition="scale-transition"
          width="40"
        />

        
      </div>

      <router-link :to="'/'" tag="div" class="v-toolbar__title"> Recipe Book </router-link>

      <v-spacer></v-spacer>

      <router-link :to="'/random-recipe'">
        <v-icon class="mr-2" large>mdi-dice-multiple-outline</v-icon>
      </router-link>

      <router-link :to="'/recipe-form'">
        <v-icon large>mdi-plus</v-icon>
      </router-link>
    </v-app-bar>

    <v-main>
      <LoginDialog :enabled="!isLoggedIn" />
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import {mapActions, mapState} from "vuex"
import LoginDialog from "@/components/LoginDialog.vue";

export default {
  name: "App",

  data: () => ({
    //
  }),
  components: {
    LoginDialog,
  },
  methods: {
    ...mapActions(["getCurrentUser"]),
  },
  computed: {
    ...mapState([
      "isLoggedIn",
    ])
  },
  mounted(){
    this.getCurrentUser();
  }
};
</script>
