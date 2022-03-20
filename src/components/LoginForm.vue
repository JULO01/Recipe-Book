<template>
  <v-card>
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
        @click="loginOrRegister(email, password, isRegister)"
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
import {mapState, mapActions, mapMutations} from "vuex"

export default {
  name: "LoginForm",
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
  computed: {
    
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
    loginOrRegister(email, password, isRegister) {
      if (isRegister) {
        this.registerAccount(email, password);
      } else {
        this.loginAccount(email, password);
      }
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