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
              <a class="btn btn-primary" :class="{disabled : item.button_inactive}" @click="getRedirect(item)">{{ item.button_mssg }}</a>
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
          path: 'public/book.png',
          redirect: '/studworkload-form',
          button_mssg: 'Response',
          button_inactive: false
        },
        {
          title: 'Big5',
          desc: 'Lorem Ipsum',
          path: 'public/neurology.png',
          redirect: '/home',
          button_mssg: 'Coming Soon',
          button_inactive: true
        },
        {
          title: 'TKI',
          desc: 'Lorem Ipsum',
          path: 'public/swords.png',
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
.card {
}
</style>
