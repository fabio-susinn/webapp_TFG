<template>
  <div class="container-fluid" id="main-container">
    <form>
      <div class="mb-3">
        <label for="email-formcontrol" class="form-label"><b>Email address</b></label>
        <input
          type="email"
          class="form-control"
          id="email-formcontrol"
          placeholder="name@alumnes.ub.edu"
        />
      </div>

      <div class="mb-3">
        <label for="niub-formcontrol" class="form-label"><b>NIUB:</b></label>
        <input type="number" class="form-control" id="niub-formcontrol" placeholder="12345678" />
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
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                :id="`stress1-d${n}`"
                value="1"
                :name="`stress-1-d${n}`"
              />
              <label class="form-check-label" :for="`stress1-d${n}`">Very Low</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                :id="`stress2-d${n}`"
                value="2"
                :name="`stress-1-d${n}`"
              />
              <label class="form-check-label" :for="`stress2-d${n}`">Low</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                :id="`stress3-d${n}`"
                value="3"
                :name="`stress-1-d${n}`"
              />
              <label class="form-check-label" :for="`stress3-d${n}`">Moderated</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                :id="`stress4-d${n}`"
                value="4"
                :name="`stress-1-d${n}`"
              />
              <label class="form-check-label" :for="`stress4-d${n}`">High</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                :id="`stress5-d${n}`"
                value="5"
                :name="`stress-1-d${n}`"
              />
              <label class="form-check-label" :for="`stress5-d${n}`">Very High</label>
            </div>
          </div>

          <label for="dedication-cont"
            ><b>How many hours did you spend on the pending task?</b></label
          >
          <div class="mb-3" id="dedication-cont">
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                :id="`ded1-d${n}`"
                value="1"
                :name="`dedication-1-d${n}`"
              />
              <label class="form-check-label" :for="`ded1-d${n}`">&#60;1h/day</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                :id="`ded2-d${n}`"
                value="2"
                :name="`dedication-1-d${n}`"
              />
              <label class="form-check-label" :for="`ded2-d${n}`">1-2h/day</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                :id="`ded3-d${n}`"
                value="3"
                :name="`dedication-1-d${n}`"
              />
              <label class="form-check-label" :for="`ded3-d${n}`">2-3h/day</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                :id="`ded4-d${n}`"
                value="4"
                :name="`dedication-1-d${n}`"
              />
              <label class="form-check-label" :for="`ded4-d${n}`">3-4h/day</label>
            </div>
            <div class="form-check form-check-inline">
              <input
                class="form-check-input"
                type="radio"
                :id="`ded5-d${n}`"
                value="5"
                :name="`dedication-1-d${n}`"
              />
              <label class="form-check-label" :for="`ded5-d${n}`">>4h/day</label>
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
                    v-model="percentage[n]"
                    step="10"
                    :name="`percentage-d${n}`"
                  />
                </div>
                <div class="col">{{ percentage[n] }}%</div>
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
      percentage: [0, 0, 0, 0, 0]
    }
  },
  computed: {
    filteredOptions() {
      return this.options[this.selectedSubject] || []
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
