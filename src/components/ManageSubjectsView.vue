<script setup>
import { db } from '@/firebase'
import { getAuth } from 'firebase/auth'
import { collection, getDocs, query, where, updateDoc } from 'firebase/firestore'
</script>

<template>
  <div class="container" id="manage_subjects_container">
    <form @submit.prevent="submitSubjects">
      <h1>Manage Your Subjects</h1>
      <p class="text-muted">Select the subjects you are currently coursing</p>
      
      <label class="form-label">Select your subjects:</label>
      <div id="subjects-container" style="margin-bottom: 16px">
        <div class="form-check" v-for="sub in subjects" :key="sub.val">
          <input
            class="form-check-input"
            type="checkbox"
            :value="sub.val"
            :id="'subject-' + sub.val"
            v-model="selectedSubjects"
          />
          <label class="form-check-label" :for="'subject-' + sub.val">
            {{ sub.text }}
          </label>
        </div>
      </div>

      <div class="button-group">
        <button type="submit" class="btn btn-primary">Save Changes</button>
        <button type="button" class="btn btn-secondary" @click="goBack">Cancel</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedSubjects: [],
      subjects: [],
      userDocId: null
    }
  },
  beforeMount() {
    this.loadUserSubjects()
    this.computeSubjects()
  },
  methods: {
    async computeSubjects() {
      const subjectRef = collection(db, 'subjects')
      const q = query(subjectRef)
      const querySnapshot = await getDocs(q)
      querySnapshot.forEach((doc) => {
        const doc_data = doc.data()
        this.subjects.push({ val: doc_data.subject_val, text: doc_data.subject_text })
      })
    },
    async loadUserSubjects() {
      const uid_user = getAuth().currentUser.uid
      const userRef = collection(db, 'users')
      const q = query(userRef, where('uid', '==', uid_user))
      const querySnapshot = await getDocs(q)
      
      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          this.userDocId = doc.id
          const userData = doc.data()
          if (userData.subjects) {
            this.selectedSubjects = [...userData.subjects]
          }
        })
      }
    },
    async submitSubjects() {
      if (this.selectedSubjects.length === 0) {
        alert('Please select at least one subject.')
        return
      }

      try {
        const uid_user = getAuth().currentUser.uid
        const userRef = collection(db, 'users')
        const q = query(userRef, where('uid', '==', uid_user))
        const querySnapshot = await getDocs(q)
        
        if (!querySnapshot.empty) {
          querySnapshot.forEach(async (doc) => {
            await updateDoc(doc.ref, {
              subjects: this.selectedSubjects
            })
          })
          alert('Subjects updated successfully!')
          this.$router.push('/home')
        } else {
          alert('User not found. Please contact support.')
        }
      } catch (error) {
        console.error('Error updating subjects: ', error)
        alert('Ooopss!\nSomething went wrong.\nTry again, please!!')
      }
    },
    goBack() {
      this.$router.push('/home')
    }
  }
}
</script>

<style scoped>
button {
  margin-top: 0.5rem;
}

.button-group {
  display: flex;
  gap: 1rem;
}

#subjects-container {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid var(--bs-border-color);
  border-radius: var(--bs-border-radius);
  padding: 1rem;
}

#subjects-container .form-check {
  margin-bottom: 0.5rem;
}

@media (max-width: 1000px) {
  #manage_subjects_container {
    border: var(--bs-border-width) solid var(--bs-border-color);
    border-radius: var(--bs-border-radius);
    padding: 3rem;
  }
}

@media (min-width: 1001px) {
  #manage_subjects_container {
    width: 50%;
    border: var(--bs-border-width) solid var(--bs-border-color);
    border-radius: var(--bs-border-radius);
    padding: 3rem;
  }
}
</style>
