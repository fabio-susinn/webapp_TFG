<script setup>
import { db } from '@/firebase'
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth'
import { collection, addDoc, getDocs, query } from 'firebase/firestore'
</script>

<template>
  <div class="container" id="signup_container">
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
          required
        />
      </div>
      <div class="mb-3">
        <label for="user_password" class="form-label">Password</label>
        <input type="password" class="form-control" id="user_password" required />
        <div class="invalid-feedback">Please introduce a valid password.</div>
        <label for="user_password" class="text-muted" style="margin-top: 0.75rem"
          >Password must be 6 characters length</label
        >
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
        required
      >
        <option v-for="sub in subjects" :value="sub.val" :key="sub">{{ sub.text }}</option>
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
            required
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
            required
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
            required
          />
          <label class="form-check-label" for="other_radio"> Other </label>
        </div>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="checkbox" value="" id="flexCheck" v-model="termsOfService" required>
        <label class="form-check-label" for="flexCheck">
          I have read and agree to the <RouterLink to="/terms-of-service" target="_blank">Terms of Service & Privacy Policy</RouterLink>.
        </label> 
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
      gender: '',
      subjects: [],
      termsOfService: ''
    }
  },
  beforeMount() {
    this.computeSubjects()
  },
  methods: {
    prepareDataSubmit() {
      const password = document.getElementById('user_password').value
      if (this.form_control()) {
        this.submitAnswer(password)
      }
    },
    form_control() {
      const regexEmail= /^[a-zA-Z0-9._%+-]+@(alumnes\.ub\.edu|estudiantat\.upc\.edu)$/;
      if (document.getElementById('user_password').length < 6) {
        document.getElementById('user_password').focus()
        return false
      }
      if (!regexEmail.test(this.email)) {
        alert('Please introduce a valid email address.\nIt must be an @alumnes.ub.edu or @estudiantat.upc.edu email.')
        document.getElementById('user_email').focus()
        return false
      }
      return true
    },
    async submitAnswer(password) {
      try {
        await createUserWithEmailAndPassword(getAuth(), this.email, password).then(()=>{
          const user_uid = getAuth().currentUser.uid
          const data = {
            uid: user_uid,
            subjects: this.selectedSubjects,
            gender: this.gender,
            termsOfService: this.termsOfService
          }
          addDoc(collection(db, 'users'), data)
            .then(() => {
              console.log('Document successfully written!')
              alert('User correctly registered!!')
            })
            .catch((error) => {
              console.error('Error writing document: ', error)
              alert('Ooopss!\n Something went wrong.\n Try again, please!!')
            })   
      })
        this.$router.push('/home')
      } catch (error) {
        const errorCode = error.code
        const errorMessage = error.message
        console.error('Error Code Authencication: ', errorCode)
        console.error('Error Message Authencication: ', errorMessage)
      }
    },
    async computeSubjects() {
      const subjectRef = collection(db, 'subjects')
      const q = query(subjectRef)
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        const doc_data = doc.data()
        this.subjects.push({ val: doc_data.subject_val, text: doc_data.subject_text })
      })
    }
  }
}
</script>

<style scoped>
button{
  margin-top: 0.5rem;
}

@media (max-width: 1000px) {
  #signup_container {
  border: var(--bs-border-width) solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  padding: 3rem;
  }
}

@media (min-width: 1001px) {
  #signup_container {
  width: 50%;
  border: var(--bs-border-width) solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  padding: 3rem;
  }
}

.tooltip {
  position: relative;
  display: inline-block;
  border-bottom: 1px dotted black;
}

.tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;

  /* Position the tooltip */
  position: absolute;
  z-index: 1;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
}
</style>
