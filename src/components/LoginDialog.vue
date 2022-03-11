<template>
  <v-row justify="center">
    <v-dialog v-model="enabled" persistent max-width="290">
      <LoginForm
        v-if="isLogin"
        @subtitle-link-clicked="showRegister"
        :actionText="'Login'"
        :subtitleText="'No account?'"
        :subtitleLinkText="'Register instead.'"
        :isRegister="false"
      />
      <LoginForm
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
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "LoginDialog",
  components: {
    LoginForm,
  },
  props: {
    //   dummy
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