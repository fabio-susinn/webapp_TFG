<script setup>
import { auth } from '@/firebase'
import { signOut ,onAuthStateChanged } from 'firebase/auth'
import { onMounted, ref } from 'vue';

const isLoggedIn = ref(false)
onMounted(() => {
  onAuthStateChanged(auth, (user) => {
    if (user){
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})
</script>

<template>
  <div data-bs-theme="dark">
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <img :src="logo_path" alt="" width="30" height="24" class="d-inline-block align-text-top">
        <a class="navbar-brand" @click="getRedirect('/home')" style="cursor: pointer;">Student Workload</a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavDropdown">
          <ul class="navbar-nav">
            <li class="nav-item">
              <a class="nav-link active" aria-current="page" @click="getRedirect('/home')"  style="cursor: pointer;">Home</a>
            </li>
          </ul>
        </div>
        <div class="my-2 my-lg-0">
          <div v-if="isLoggedIn">
          <button class="btn btn-outline-light my-2 my-sm-0" @click="handleSignOut">Log Out</button>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logo_path: "src/assets/school.svg"
    }
  },
  methods: {
    getRedirect(item) {
      this.$router.push(item)
    }, 
    handleSignOut() {
      signOut(auth).then(() => {
        this.$router.push("/login")
      })
    }
  }
}
</script>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
