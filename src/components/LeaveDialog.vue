// This component shows a dialog that asks the user if he wants to leave. Text, Button texts and "hidden"-attribute are properties.

<template>
  <v-dialog v-model="dialogEnabled">
    <v-card>
      <v-card-title class="text-h6">
        {{ text }}
      </v-card-title>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="green darken-1" text @click="accept">
          {{ acceptButtonText }}
        </v-btn>

        <v-btn color="red darken-1" text @click="decline">
          {{ declineButtonText }}
        </v-btn>

        <v-spacer></v-spacer>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "LeaveDialog",
  props: {
    text: String,
    acceptButtonText: String,
    declineButtonText: String,
    enabled: Boolean,
  },
  methods: {
    accept() {
      this.dialogEnabled = false;
      this.$emit("accepted");
    },
    decline() {
      this.dialogEnabled = false;
      this.$emit("declined");
    },
  },
  data() {
    return {
      dialogEnabled: this.enabled,
    };
  },
  watch: {
    enabled: function (newVal, oldVal) {
      this.dialogEnabled = newVal;
    },
  },
};
</script>

<style scoped>
</style>