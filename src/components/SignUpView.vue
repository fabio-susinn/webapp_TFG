<script setup>
import { db } from '@/firebase'
import { auth } from '@/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { collection, addDoc } from 'firebase/firestore'
</script>

<template>
  <div class="container" id="login_container">
    <form @submit.prevent="prepareDataSubmit">
      <h1>Sign Up</h1>
      <div class="mb-3">
        <label for="user_email" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="user_email"
          aria-describedby="emailHelp"
          placeholder="name@alumnes.ub.edu"
          v-model="email"
        />
      </div>
      <div class="mb-3">
        <label for="niub-formcontrol" class="form-label">NIUB</label>
        <input
          type="number"
          class="form-control"
          id="niub-formcontrol"
          placeholder="12345678"
          v-model="niub"
        />
      </div>
      <div class="mb-3">
        <label for="user_password" class="form-label">Password</label>
        <input type="password" class="form-control" id="user_password" />
      </div>
      <label for="subject-select" class="form-label">Select the subjects you are coursing:</label>
      <select
        class="form-select"
        aria-label="Default select example"
        id="subject-select"
        style="margin-bottom: 16px"
        multiple
        size="5"
        v-model="selectedSubjects"
      >
        <option value="ProgI">Programació I</option>
        <option value="ED">Estructura de Dades</option>
        <option value="NDV">Normative & Dynamic Virtual Worlds</option>
        <option value="ML">Introduction to Machine Learning</option>
        <option value="TFG">Projecte Final de Grau</option>
      </select>
      <label for="subject-select" class="text-muted" style="margin-bottom: 0.75rem"
        >Hold down CTRL and click to select multiple choices</label
      >

      <div id="gender_container" style="margin-bottom: 0.75rem">
        <label for="gender_container" class="form-label">Select your gender: </label>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="gender_radio"
            id="male_radio"
            value="M"
            v-model="gender"
          />
          <label class="form-check-label" for="male_radio"> Male </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="gender_radio"
            id="female_radio"
            value="F"
            v-model="gender"
          />
          <label class="form-check-label" for="female_radio"> Female </label>
        </div>
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="gender_radio"
            id="other_radio"
            value="X"
            v-model="gender"
          />
          <label class="form-check-label" for="other_radio"> Other </label>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">Register</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      selectedSubjects: [],
      niub: '',
      gender: ''
    }
  },
  methods: {
    prepareDataSubmit() {
      const data = {
        email: this.email,
        niub: this.niub,
        subjects: this.selectedSubjects,
        gender: this.gender
      }

      const password = document.getElementById('user_password').value

      this.submitAnswer(data, password)
    },
    submitAnswer(data, password) {
      createUserWithEmailAndPassword(auth, data.email, password).then(
        addDoc(collection(db, 'users'), data)
        .then(() => {
          console.log('Document successfully written!')
          alert('User correctly registered!!')
          this.$router.push("/home")
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
          alert('Ooopss!\n Something went wrong.\n Try again, please!!')
        })
      ).catch((error) => {
          const errorCode = error.code
          const errorMessage = error.message
          console.error('Error Code Authencication: ', errorCode)
          console.error('Error Message Authencication: ', errorMessage)
          // ..
        })
    }
  }
}
</script>

<style scoped>
#login_container {
  width: 50%;
  border: var(--bs-border-width) solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  padding: 3rem;
}
</style>
