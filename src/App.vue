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

      <router-link :to="'/'" tag="div" class="v-toolbar__title">
        Recipe Book
      </router-link>

      <v-spacer></v-spacer>

    </v-app-bar>

    <v-main>
      <LoginDialog :enabled="!isLoggedIn" />
      <router-view />
    </v-main>

    <v-card>
      <v-footer color="primary" app fixed>
        <v-tabs height="2.8em" background-color="primary" centered dark icons-and-text>
          <v-tab to="/">
            <v-icon color="white" large>mdi-home-outline</v-icon>
          </v-tab>
          <v-tab to="/random-recipe">
            <v-icon color="white" large>mdi-dice-multiple-outline</v-icon>
          </v-tab>
          <v-tab to="recipe-form">
            <v-icon color="white" large>mdi-plus</v-icon>
          </v-tab>
        </v-tabs>
      </v-footer>
    </v-card>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";
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
    ...mapState(["isLoggedIn"]),
  },
  mounted() {
    this.getCurrentUser();
  },
};
</script>


<style lang="sass" scoped>
$tab-font-size: 4px
</style>
