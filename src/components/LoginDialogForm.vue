// This component shows the form for the LoginDialog, it's text and store actions can be modified through its props. 

<template>
  <v-card rounded="lg">
    <v-card-title class="text-h5"> {{ actionText }} </v-card-title>
    <v-card-text>
      <v-form>
        <v-text-field
          v-model="email"
          label="Email"
          required
          clearable
        ></v-text-field>
        <v-text-field
          v-model="password"
          label="Password"
          required
          :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
          @click:append="showPassword = !showPassword"
          :type="showPassword ? 'text' : 'password'"
        ></v-text-field>
      </v-form>
    </v-card-text>
    <v-card-subtitle class="text-center mt-n8 red--text">{{
      errorMessage
    }}</v-card-subtitle>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        class="mt-n3 mb-5"
        color="primary"
        dark
        @click="isRegister ? registerAccount(email, password) : loginAccount(email, password)"
      >
        {{ actionText }}
      </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>

    <v-divider class="mx-4 mb-3"></v-divider>

    <v-card-subtitle class="text-center">
      {{ subtitleText }}
      <br />
      <a @click="subtitleLinkClicked()">
        {{ subtitleLinkText }}
      </a></v-card-subtitle
    >
  </v-card>
</template>

<script>
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import {mapActions, mapMutations} from "vuex"

export default {
  name: "LoginDialogForm",
  props: {
    actionText: String,
    subtitleText: String,
    subtitleLinkText: String,
    isRegister: Boolean,
  },
  data() {
    return {
      email: String,
      password: String,
      showPassword: Boolean,
      errorMessage: String,
    };
  },
  created() {
    this.email = "";
    this.password = "";
    this.errorMessage = "";
    this.showPassword = false;
  },
  methods: {
    ...mapMutations(["setUserId", "setIsLoggedIn"]),
    ...mapActions(["getOwnRecipes"]),
    registerAccount(email, password) {
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          this.setUserId(user.uid);
          this.setIsLoggedIn(true);
          this.getOwnRecipes();
          this.errorMessage = "";
        })
        .catch((error) => {
          //   const errorCode = error.code;
          const errorMessage = error.message;
          this.errorMessage = errorMessage;

          // ..
        });
    },
    loginAccount(email, password) {
      const auth = getAuth();

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          this.setUserId(user.uid);
          this.setIsLoggedIn(true);
          this.getOwnRecipes();
          this.errorMessage = "";
        })
        .catch((error) => {
          //   const errorCode = error.code;
          const errorMessage = error.message;
          this.errorMessage = errorMessage;
        });
    },
   
    subtitleLinkClicked(){
      this.email = "";
      this.password = "";
      this.$emit('subtitle-link-clicked');
    }
  },
};
</script>

<style scoped>
</style>