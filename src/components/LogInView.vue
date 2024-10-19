<script setup>
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
</script>

<template>
  <div class="container" id="login_container">
    <form @submit.prevent="loginUser">
      <h1>Log In</h1>
      <div class="mb-3">
        <label for="user_email" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="user_email"
          aria-describedby="emailHelp"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="user_password" class="form-label">Password</label>
        <input type="password" class="form-control" id="user_password" v-model="password" />
      </div>
      <p>
        <a class="link-opacity-50-hover" @click="moveToSignUp" style="cursor: pointer"
          >Don't have an account yet? Sign Up here!</a
        >
      </p>
      <button type="submit" class="btn btn-primary">Log In</button>
    </form>
  </div>
</template>

<style scoped>
#login_container {
  width: 50%;
  border: var(--bs-border-width) solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  padding: 3rem;
}
</style>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      user: {}
    }
  },
  methods: {
    moveToSignUp() {
      this.$router.push('/signup')
    },
    async loginUser() {
      const auth = getAuth()
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user
          this.user = user
          this.$router.push('/home')
        })
      }
         catch (error) {
          const errorCode = error.code
          const errorMessage = error.message
          console.error('Error Code Authentication: ', errorCode)
          console.error('Error Message Authentication: ', errorMessage)
        }
    }
  }
}
</script>
