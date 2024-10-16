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
              <a class="btn btn-primary" @click="getRedirect(item)">Response</a>
            </div>
          </div>
        </div>
      </template>
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
          desc: 'Lorem Ipsum',
          path: 'src/assets/book.png',
          redirect: '/studworkload-form'
        },
        {
          title: 'Big5',
          desc: 'Lorem Ipsum',
          path: 'src/assets/neurology.png',
          redirect: '/studworkload-form'
        },
        {
          title: 'TKI',
          desc: 'Lorem Ipsum',
          path: 'src/assets/swords.png',
          redirect: '/studworkload-form'
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
.card {
}
</style>
