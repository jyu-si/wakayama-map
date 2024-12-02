<template>
  <div>
    <h1>Authentication Test</h1>
    <form @submit.prevent="registerUser">
      <input
        type="email"
        v-model="email"
        placeholder="Email"
        required
      />
      <input
        type="password"
        v-model="password"
        placeholder="Password"
        required
      />
      <button type="submit">Register</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { auth } from "@/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
      message: null,
    };
  },
  methods: {
    async registerUser() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        this.message = `User created: ${userCredential.user.email}`;
      } catch (error) {
        this.message = `Error: ${error.message}`;
      }
    },
  },
};
</script>
