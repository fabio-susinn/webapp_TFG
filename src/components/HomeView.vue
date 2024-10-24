<template>
  <div class="container-fluid">
    <div class="row">
      <template v-for="item in info_forms" :key="item">
        <div class="col">
          <div class="card">
            <img :src="item.path" class="card-img-top" alt="..." />
            <div class="card-body">
              <h2 class="card-title">{{ item.title }}</h2>
              <p class="card-text">
                {{ item.desc }}
              </p>
              <a
                class="btn btn-primary"
                :class="{ disabled: item.button_inactive }"
                @click="getRedirect(item)"
                >{{ item.button_mssg }}</a
              >
            </div>
          </div>
        </div>
      </template>
    </div>
    <div class="row">
      <div class="col">
        <div class="bd-callout">
          <span style="white-space: pre-line">
            This research project aims to examine the impact of different types of exams on
            students' emotional stress levels and academic performance, while also identifying and
            classifying distinct student profiles.<br> <br>
            Participants will complete a questionnaire,
            reporting their perceived stress, workload, and the percentage of study completed in the
            five days leading up to their exam. By applying statistical analysis to the survey
            responses and using data science techniques to analyze academic grades, the project
            seeks to develop quantitative tools for the early detection of students at risk of
            procrastination.<br><br>
            All data collected will be anonymized to ensure the privacy and
            confidentiality of participants is fully preserved.
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info_forms: [
        {
          title: 'Student Workload',
          desc: 'Track your Stress & Dedication',
          path: '/book.png',
          redirect: '/studworkload-form',
          button_mssg: 'Response',
          button_inactive: false
        },
        {
          title: 'Big5',
          desc: 'In Development',
          path: '/big5.webp',
          redirect: '/home',
          button_mssg: 'Coming Soon',
          button_inactive: true
        },
        {
          title: 'TKI',
          desc: 'In Development',
          path: '/swords.png',
          redirect: '/home',
          button_mssg: 'Coming Soon',
          button_inactive: true
        }
      ]
    }
  },
  methods: {
    getRedirect(item) {
      this.$router.push(item.redirect)
    }
  }
}
</script>

<style scoped>
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

.bd-callout-info {
  --bd-callout-color: var(--bs-info-text-emphasis);
  --bd-callout-bg: var(--bs-info-bg-subtle);
  --bd-callout-border: var(--bs-info-border-subtle);
}
</style>
