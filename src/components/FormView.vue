<template>
  <div class="container-fluid" id="main-container">
    <form>
      <div class="mb-3">
        <label for="email-formcontrol" class="form-label">Email address</label>
        <input
          type="email"
          class="form-control"
          id="email-formcontrol"
          placeholder="name@alumnes.ub.edu"
        />
      </div>

      <div class="mb-3">
        <label for="niub-formcontrol" class="form-label">NIUB:</label>
        <input type="number" class="form-control" id="niub-formcontrol" placeholder="12345678" />
      </div>

      <label for="subject-select" class="form-label">Select a subject</label>
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

      <label for="task-select" class="form-label">Select a task</label>
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

      <label for="stress-cont"
        >How would you rate the stress level caused by the pending task?</label
      >

      <div class="mb-3" id="stress-cont">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="stress1"
            value="1"
            name="inlineRadioOptions"
          />
          <label class="form-check-label" for="stress1">Very Low</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="stress2"
            value="2"
            name="inlineRadioOptions"
          />
          <label class="form-check-label" for="stress2">Low</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="stress3"
            value="3"
            name="inlineRadioOptions"
          />
          <label class="form-check-label" for="stress3">Moderated</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="stress4"
            value="4"
            name="inlineRadioOptions"
          />
          <label class="form-check-label" for="stress4">High</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="stress5"
            value="5"
            name="inlineRadioOptions"
          />
          <label class="form-check-label" for="stress5">Very High</label>
        </div>
      </div>

      <label for="dedication-cont">How many hours do you spend on the pending task?</label>
      <div class="mb-3" id="dedication-cont">
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="ded1"
            value="1"
            name="inlineRadioOptions"
          />
          <label class="form-check-label" for="ded1">&#60;1h/day</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="ded2"
            value="2"
            name="inlineRadioOptions"
          />
          <label class="form-check-label" for="ded2">1-2h/day</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="ded3"
            value="3"
            name="inlineRadioOptions"
          />
          <label class="form-check-label" for="ded3">2-3h/day</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="ded4"
            value="4"
            name="inlineRadioOptions"
          />
          <label class="form-check-label" for="ded4">3-4h/day</label>
        </div>
        <div class="form-check form-check-inline">
          <input
            class="form-check-input"
            type="radio"
            id="ded5"
            value="5"
            name="inlineRadioOptions"
          />
          <label class="form-check-label" for="ded5">>4h/day</label>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
      }
    }
  },
  computed: {
    filteredOptions() {
      return this.options[this.selectedSubject] || []
    }
  }
}
</script>

<style scoped></style>
