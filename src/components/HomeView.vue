<script setup>
import TermsOfServicePush from './TermsOfServicePush.vue';
</script>

<template>
  <Transition>
    <TermsOfServicePush class="push-notification" v-if="hasTermsOfService" @custom-click="handleTermsAccepted"></TermsOfServicePush>
  </Transition>
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
import { db } from '@/firebase';
import { getAuth } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';

export default {
  components: {TermsOfServicePush},
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
          desc: "Personality test based on Five Traits",
          path: '/big5.webp',
          redirect: '/personality-form/big5',
          button_mssg: 'Response',
          button_inactive: false
        },
        {
          title: 'TKI',
          desc: 'Personality test based on Conflict Resolution',
          path: '/swords.png',
          redirect: '/personality-form/tki',
          button_mssg: 'Response',
          button_inactive: false
        }
      ], 
      hasTermsOfService: false
    }
  },
  created(){
    this.getResponsedForms()
  },
  methods: {
    async getResponsedForms(){
      const formBig5rackRef = collection(db, 'big5-tracking')
      const formTKIrackRef = collection(db, 'tki-tracking')
      const userRef = collection(db, 'users')
      const uid_user = getAuth().currentUser.uid
      const q1 = query(formBig5rackRef, where('uid', '==', uid_user))
      const q2 = query(formTKIrackRef, where('uid', '==', uid_user))
      const q3 = query(userRef, where('uid', "==", uid_user), where("termsOfService","==", true))
      const querySnapshot = await getDocs(q1)
      const querySnapshot2 = await getDocs(q2)
      const querySnapshot3 = await getDocs(q3)
      if (!querySnapshot.empty){
        this.info_forms[1].button_inactive = true
        this.info_forms[1].button_mssg = "Responsed"
      }
      if (!querySnapshot2.empty){
        this.info_forms[2].button_inactive = true
        this.info_forms[2].button_mssg = "Responsed"
      }
      if(querySnapshot3.empty){
        this.hasTermsOfService = true
      }
    },
    getRedirect(item) {
      this.$router.push(item.redirect)
    },
    handleTermsAccepted(){
      this.hasTermsOfService = false
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

.v-leave-active {
  transition: opacity 0.5s ease;
}
.v-leave-to {
  opacity: 0;
}
</style>
