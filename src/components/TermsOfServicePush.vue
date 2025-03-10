<script setup>
import { db } from '@/firebase';
import { getAuth } from 'firebase/auth';
import { collection, doc, getDocs, query, updateDoc, where } from 'firebase/firestore';
</script>

<template>
  <div class="push-container">
      I have read and agree to the <RouterLink to="/terms-of-service" target="_blank">Terms of Service & Privacy Policy</RouterLink>
      <button type="submit" class="btn btn-primary push-button" @click="acceptTermsService">Agree</button>
  </div>
</template>

<script>
export default {
  data() {
  },
  setup(){
  },
  methods: {
    async acceptTermsService(){
      const user_collection = collection(db, "users")
      const user_uid = getAuth().currentUser.uid
      const q = query(user_collection, where("uid", "==", user_uid))
      const querySnapshot = await getDocs(q)
      for (const docSnapshot of querySnapshot.docs) {
        const userRef = doc(db, "users", docSnapshot.id);
        try {
          await updateDoc(userRef, 
          {
              termsOfService: true
          })
          this.$emit("custom-click")    
        } catch(error) {
          console.log(error)
        }    
      }
    }
  }
}
</script>

<style scoped>
.push-container{
    margin: 0;
    padding: 2rem 1rem 2rem 1rem;  
    position: fixed;
    top:5rem;
    right: 0px;
    background-color: rgb(255, 255, 255);
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
    box-shadow: 0 5px 8px rgba(0, 0, 0, 0.350);
    border: 1px solid var(--bd-callout-border, var(--bs-gray-300));
    z-index: 99999;
}

.push-button{
    margin-left:0.5rem;
}
</style>

