// This component shows a login dialog, that handles both, the login and register proccess.

<template>
  <v-row justify="center">
    <v-dialog v-model="enabled" persistent max-width="290">
      <LoginDialogForm
        v-if="isLogin"
        @subtitle-link-clicked="showRegister"
        :actionText="'Login'"
        :subtitleText="'No account?'"
        :subtitleLinkText="'Register instead.'"
        :isRegister="false"
      />
      <LoginDialogForm
        v-if="isRegister"
        @subtitle-link-clicked="showLogin"
        :actionText="'Register'"
        :subtitleText="'Already have an account?'"
        :subtitleLinkText="'Login instead.'"
        :isRegister="true"
      />
    </v-dialog>
  </v-row>
</template>

<script>
import LoginDialogForm from "@/components/LoginDialogForm.vue";

export default {
  name: "LoginDialog",
  components: {
    LoginDialogForm,
  },
  props: {
    enabled: Boolean,
  },
  data() {
    return {
      valid: Boolean,
      isRegister: Boolean,
      isLogin: Boolean,
    };
  },
  created() {
    this.isLogin = true;
    this.isRegister = false;
    this.valid = false;
    this.email = "";
    this.password = "";
  },
  methods: {
    showRegister() {
      this.isRegister = true;
      this.isLogin = false;
    },
    showLogin() {
      this.isRegister = false;
      this.isLogin = true;
    },
  },
  
};
</script>

<style scoped>
</style>