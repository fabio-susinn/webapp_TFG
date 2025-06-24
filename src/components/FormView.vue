<script setup>
import { db } from '@/firebase'
import { getAuth } from 'firebase/auth'
import { collection, addDoc, getDocs, where, query } from 'firebase/firestore'
</script>

<template>
  <div class="container-fluid" id="main-container">
    <form @submit.prevent="prepareDataSubmit">
      <h1 style="margin-bottom: 3rem">Questionnaire: Student Workload Tracking</h1>
      <label for="subject-select" class="form-label"><b>Select a subject:</b></label>
      <select
        class="form-select"
        aria-label="Default select example"
        id="subject-select"
        style="margin-bottom: 16px"
        v-model="selectedSubject"
        required
      >
        <option disabled value="---">---</option>
        <option v-for="sub in subjects" :value="sub.val" :key="sub">{{ sub.text }}</option>
      </select>

      <label for="task-select" class="form-label"><b>Select a task:</b></label>
      <select
        class="form-select"
        aria-label="Default select example"
        id="task-select"
        style="margin-bottom: 16px"
        v-model="selectedTask"
        required
      >
        <option v-for="(option, index) in filteredOptions" :key="index" :value="option">
          {{ option }}
        </option>
      </select>

      <div class="bd-callout">
        <b>Note:</b> Filling all sub-day forms is NOT mandatory to submit your answer. (Ex: You just worked the past 3 days)
      </div>

      <template v-for="n in numberPrevDays" :key="n">
        <h2>{{ numberPrevDays + 1 - n }}-Day To Deadline</h2>
        <div class="container day_container">
          <label for="stress-cont">
            <b>How would you rate the stress level caused by the pending task?</b></label
          >
          <div class="mb-3" id="stress-cont">
            <div
              class="form-check form-check-inline"
              v-for="(level, index) in stressLevels"
              :key="index"
            >
              <input
                class="form-check-input"
                type="radio"
                :id="`stress${index + 1}-d${n}`"
                :value="index + 1"
                :name="`stress-1-d${n}`"
                v-model="stressLevelsValues[n - 1]"
              />
              <label class="form-check-label" :for="`stress${index + 1}-d${n}`">{{ level }}</label>
            </div>
          </div>

          <label for="dedication-cont"
            ><b>How many hours did you spend on the pending task?</b></label
          >
          <div class="mb-3" id="dedication-cont">
            <div
              class="form-check form-check-inline"
              v-for="(option, index) in dedicationOptions"
              :key="index"
            >
              <input
                class="form-check-input"
                type="radio"
                :id="`ded${index + 1}-d${n}`"
                :value="index + 1"
                :name="`dedication-1-d${n}`"
                v-model="dedicationValues[n - 1]"
              />
              <label class="form-check-label" :for="`ded${index + 1}-d${n}`">{{ option }}</label>
            </div>
          </div>

          <div class="range_cotainer">
            <label for="percentage_task" class="form-label text-muted"
              >Use the slider to indicate the percentage of the task completed</label
            >
            <div class="container">
              <div class="row">
                <div class="col">
                  <input
                    type="range"
                    class="form-range"
                    id="percentage_task"
                    :value="percentage[n - 1]"
                    :max="100"
                    step="10"
                    :name="`percentage-d${n}`"
                    @change="updateOtherSliders(n - 1, $event.target.value)"
                  />
                </div>
                <div class="col">{{ percentage[n - 1] }}%</div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <button type="submit" class="btn btn-primary" style="margin-bottom: 3rem;">Submit</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      numberPrevDays: 5,
      email: '',
      niub: '',
      subjects: [],
      selectedSubject: '',
      selectedTask: '',
      options: {},
      percentage: Array(5).fill(0),
      percentage_previous: Array(5).fill(0),
      stressLevels: ['Very Low', 'Low', 'Moderated', 'High', 'Very High'],
      stressLevelsValues: Array(5).fill(null),
      dedicationOptions: ['<1h/day', '1-2h/day', '2-3h/day', '3-4h/day', '>4h/day'],
      dedicationValues: Array(5).fill(null),
      userSubjects: []
    }
  },

  async mounted() {
    await this.dataUser()
    this.computeSubjects()
  },
  computed: {
    filteredOptions() {
      return this.options[this.selectedSubject] || []
    }
  },
  methods: {
    async dataUser() {
      const usersRef = collection(db, 'users')
      const uid_user = getAuth().currentUser.uid
      const q = query(usersRef, where('uid', '==', uid_user))
      const querySnapshot = await getDocs(q)
      this.userSubjects = querySnapshot.docs[0].data().subjects
    },
    async computeSubjects() {
      const subjectRef = collection(db, 'subjects')
      const q = query(subjectRef, where("subject_val", "in", this.userSubjects))
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        const doc_data = doc.data()
        this.subjects.push({ val: doc_data.subject_val, text: doc_data.subject_text })
        this.options[doc_data.subject_val] = doc_data.tasks
      })
    },
    controlData(){
      const countStressNulls = this.stressLevelsValues.filter(item => item === null).length
      const countStressDedication = this.dedicationValues.filter(item => item === null).length
      
      if(countStressDedication == 5 && countStressNulls == 5){
        alert('Please, fill at least one previous day form.')
        return false
      }
      for(let i = 1; i < this.numberPrevDays; i++) {
        console.log(+this.percentage[i], this.percentage[i - 1])

        if(+this.percentage[i] < +this.percentage[i - 1]) {
          alert('The completed percentage of the task must be non-decreasing. \n Ex: 60%, 70%, 80%, 90%, 100%')
          return false
        }
      }

      return true
    },
    prepareDataSubmit() {
      const data = {
        uid: getAuth().currentUser.uid,
        subject: this.selectedSubject,
        task: this.selectedTask,
        days: this.numberPrevDays,
        stressLevels: this.stressLevelsValues,
        dedication: this.dedicationValues,
        percentages: this.percentage,
        date: this.getCurrentDate()
      }
      if (this.controlData()){
        this.submitAnswer(data)
      }
    },
    submitAnswer(data) {
      addDoc(collection(db, 'stud-workload-tracking'), data)
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
    updateOtherSliders(idx, val) {
      this.percentage[idx] = val
      for (let i = idx + 1; i < this.numberPrevDays; i++) {
        this.percentage[i] = val
      }
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

<style scoped>
.range_cotainer {
  width: 50%;
}

.day_container {
  padding: 0.375rem 0.75rem;
}

.bd-callout {
  --bs-link-color-rgb: var(--bd-callout-link);
  --bs-code-color: var(--bd-callout-code-color);
  padding: 1.25rem;
  margin-top: 1.25rem;
  margin-bottom: 1.25rem;
  color: var(--bd-callout-color, inherit);
  background-color: var(--bd-callout-bg, var(--bs-gray-100));
  border-left: 0.25rem solid var(--bd-callout-border, var(--bs-gray-300));
}
</style>
