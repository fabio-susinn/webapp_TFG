<script setup>
import { db } from '@/firebase'
import { collection, addDoc } from 'firebase/firestore'
</script>

<template>
  <div class="container-fluid" id="main-container">
    <form @submit.prevent="prepareDataSubmit">
      <h1 style="margin-bottom: 3rem">Questionnaire: Student Workload Tracking</h1>

      <div class="mb-3">
        <label for="email-formcontrol" class="form-label"><b>Email address</b></label>
        <input
          type="email"
          class="form-control"
          id="email-formcontrol"
          placeholder="name@alumnes.ub.edu"
          v-model="email"
        />
      </div>

      <div class="mb-3">
        <label for="niub-formcontrol" class="form-label"><b>NIUB:</b></label>
        <input
          type="number"
          class="form-control"
          id="niub-formcontrol"
          placeholder="12345678"
          v-model="niub"
        />
      </div>

      <label for="subject-select" class="form-label"><b>Select a subject:</b></label>
      <select
        class="form-select"
        aria-label="Default select example"
        id="subject-select"
        style="margin-bottom: 16px"
        v-model="selectedSubject"
      >
        <option disabled value="---">---</option>
        <option value="ProgI">Programació I</option>
        <option value="ED">Estructura de Dades</option>
        <option value="NDV">Normative & Dynamic Virtual Worlds</option>
        <option value="ML">Introduction to Machine Learning</option>
        <option value="TFG">Projecte Final de Grau</option>
      </select>

      <label for="task-select" class="form-label"><b>Select a task:</b></label>
      <select
        class="form-select"
        aria-label="Default select example"
        id="task-select"
        style="margin-bottom: 16px"
        v-model="selectedTask"
      >
        <option v-for="(option, index) in filteredOptions" :key="index" :value="option">
          {{ option }}
        </option>
      </select>

      <template v-for="n in numberPrevDays" :key="n">
        <h2>DAY {{ n }}</h2>

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
                    value="0"
                    v-model="percentage[n - 1]"
                    step="10"
                    :name="`percentage-d${n}`"
                  />
                </div>
                <div class="col">{{ percentage[n - 1] }}%</div>
                <div></div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <button type="submit" class="btn btn-primary">Submit</button>
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
      selectedSubject: '',
      selectedTask: '',
      options: {
        ProgI: [
          'Prova PRAC1',
          'Prova PRAC2',
          'Prova PRAC3',
          'Parcial 1',
          'Parcial 2/Final',
          'Reavaluació Pràctiques',
          'Reavaluació Teoria'
        ],
        ED: [
          'Prova PRAC1',
          'Prova PRAC2',
          'Prova PRAC3',
          'Parcial',
          'Final',
          'Reavaluació Pràctiques',
          'Reavaluació Teoria'
        ],
        NDV: [
          'Sprint 1 Lab Project',
          'Sprint 2 Lab Project',
          'Sprint 3 Lab Project',
          'Upload Final Report',
          'Oral Presentation'
        ],
        ML: ['Work 2 Lab Project', 'Work 3 Lab Project', 'Work 4 Lab Project', 'Final Exam'],
        TFG: ['Sprint 1', 'Sprint 2', 'Sprint 3', 'Entrega Memòria']
      },
      percentage: Array(5).fill(0),
      stressLevels: ['Very Low', 'Low', 'Moderated', 'High', 'Very High'],
      stressLevelsValues: Array(5).fill(null),
      dedicationOptions: ['<1h/day', '1-2h/day', '2-3h/day', '3-4h/day', '>4h/day'],
      dedicationValues: Array(5).fill(null)
    }
  },
  computed: {
    filteredOptions() {
      return this.options[this.selectedSubject] || []
    }
  },
  methods: {
    prepareDataSubmit() {
      const data = {
        email: this.email,
        niub: this.niub,
        subject: this.selectedSubject,
        task: this.selectedTask,
        days: this.numberPrevDays,
        stressLevels: this.stressLevelsValues,
        dedication: this.dedicationValues,
        percentages: this.percentage
      }

      this.submitAnswer(data)
    },
    submitAnswer(data) {
      addDoc(collection(db, 'stud-workload-tracking'), data)
        .then(() => {
          console.log('Document successfully written!')
          alert('Document successfully written!\nThanks for your collaboration :) !! ')
          this.$router.push("/home")
        })
        .catch((error) => {
          console.error('Error writing document: ', error)
          alert('Ooopss!\n Something went wrong.\n Try again, please!!')
        })
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
</style>
