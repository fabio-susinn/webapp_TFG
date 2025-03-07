<script setup>
import { db } from '@/firebase'
import { getAuth } from 'firebase/auth'
import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore'
</script>

<template>
  <div class="container-fluid" id="main-container">
    <form @submit.prevent="prepareDataSubmit">
      <h1 style="margin-bottom: 3rem">{{ formName }}</h1>
      <p>{{ formDesc }}</p>
      <div v-if="big5">
        <template v-for="(question, n) in formQuestions" :key="n">
        <label :for="`question-${n}`" style="margin-bottom: 0.5rem">
          <b>{{ question }}</b>
        </label>
        <div class="mb-3" :id="`question-${n}`">
          <div
            class="form-check form-check-inline"
            v-for="(level, index) in agreementLevels"
            :key="index"
          >
            <input
              class="form-check-input"
              type="radio"
              :id="`q${index + 1}-d${n}`"
              :value="index + 1"
              :name="`q-d${n}`"
              v-model="agreementLevelsValues[n]"
              required
            />
            <label class="form-check-label" :for="`q${index + 1}-d${n}`">{{ level }}</label>
          </div>
        </div>
        </template>
      </div>
      <div v-else>
        <template v-for="(n, question) in Object.keys(formQuestions)" :key="n">
          <label :for="`question-${question}`" style="margin-bottom: 0.5rem">
            <b>Choose the resolution that best fits to you: </b>
          </label>
          <div class="mb-3" :id="`question-${question}`">
            <div
            class="form-check"
            v-for="(opt, index) in formQuestions[n]"
            :key="index"
            >
            <input
              class="form-check-input"
              type="radio"
              :id="`q${index + 1}-d${n}`"
              :value="index + 1"
              :name="`q-d${n}`"
              v-model="agreementLevelsValues[question]"
              required
            />
            <label class="form-check-label" :for="`q${index + 1}-d${n}`">{{ opt }}</label>
            </div>
          </div>
        </template>
      </div>
      <button type="submit" class="btn btn-primary" style="margin-bottom: 3rem">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formName: 'Loading',
      formQuestions: [],
      agreementLevels: ['Strongly Disagree', 'Disagree', 'Neutral', 'Agree', 'Strongly Agree'],
      agreementLevelsValues: [],
      formDesc: "",    
      big5: false,
    }
  },
  mounted() {
    this.checkIfResponsed()
    this.fetchFormQuestions()
  },
  methods: {
    async checkIfResponsed() {
      const formTrackRef = collection(db, `${this.$route.params.formName}-tracking`)
      const uid_user = getAuth().currentUser.uid
      const q = query(formTrackRef, where('uid', '==', uid_user))
      const querySnapshot = await getDocs(q)
      if (!querySnapshot.empty) {
        this.$router.push('/home')
      }
    },
    async fetchFormQuestions() {
      const pFormDocRef = doc(db, 'personality-forms', this.$route.params.formName)
      const docSnap = await getDoc(pFormDocRef)
      if (docSnap.exists()) {
        this.big5 = this.$route.params.formName == 'big5'
        const docData = docSnap.data()
        this.formName = docData.name
        this.formQuestions = docData.questions
        this.formDesc = docData.desc
        const length = this.big5 ? this.formQuestions.length : Object.keys(this.formQuestions).length
        this.agreementLevelsValues = new Array(length).fill(null)
      } else {
        console.log('No such document!')
      }
    },
    prepareDataSubmit() {
      const data = {
        uid: getAuth().currentUser.uid,
        answers: this.agreementLevelsValues,
        date: this.getCurrentDate()
      }

      this.submitAnswer(data)
    },
    submitAnswer(data) {
      addDoc(collection(db, `${this.$route.params.formName}-tracking`), data)
        .then(() => {
          console.log('Document successfully written!')
          alert('Document successfully written!\nThanks for your collaboration :) !! ')
          this.$router.push('/home')
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
          alert('Ooopss!\n Something went wrong.\n Try again, please!!')
        })
    },
    getCurrentDate() {
      const date = new Date()
      const day = String(date.getDate()).padStart(2, '0') // Get day and pad with 0 if needed
      const month = String(date.getMonth() + 1).padStart(2, '0') // Get month (0-indexed, so add 1) and pad
      const year = date.getFullYear() // Get full year

      return `${day}/${month}/${year}` // Format as dd/mm/yyyy
    }
  }
}
</script>
