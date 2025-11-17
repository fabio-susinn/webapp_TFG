<script setup>
import { onAuthStateChanged, getAuth } from 'firebase/auth'
import { onMounted, ref } from 'vue';

const isLoggedIn = ref(false)
onMounted(() => {
  onAuthStateChanged(getAuth(), (user) => {
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
            <li class="nav-item" v-if="isLoggedIn">
              <a class="nav-link" @click="getRedirect('/manage-subjects')" style="cursor: pointer;" title="Manage Subjects">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                  <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                </svg>
                <span class="ms-1">Subjects</span>
              </a>
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
      logo_path: "/school.svg"
    }
  },
  methods: {
    getRedirect(item) {
      this.$router.push(item)
    }, 
    async handleSignOut() {
      try{
        await getAuth().signOut().then(
            this.$router.push("/login")
         ) 
      }catch (error) {
        console.error(error.message)
      }
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
