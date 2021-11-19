<template>
  <div class="main-component">
    <transition name="fade">
      <loading-component v-if="data.loading" />
    </transition>
    <transition name="fade">
      <div v-if="!data.loading && !auth" class="full-page">
        <router-view />
      </div>
    </transition>
    <transition name="fade">
      <div v-if="!data.loading && auth" class="full-page">
        <router-view />
      </div>
    </transition>
  </div>
</template>

<script>
import { reactive } from 'vue';
import { useGetters, useActions } from 'vuex-composition-helpers';
import Loading from '@/components/animations/Loading.vue';

export default {
  name: 'App',
  components: {
    'loading-component': Loading,
  },
  setup() {
    // Loading data
    const data = reactive({
      loading: true,
      auth: false,
    });

    // Vuex

    const { token } = useGetters({
      token: 'token',
    });

    const { validate } = useActions({
      validate: 'validate',
    });

    // Validate Auth User

    validate(token)
      .then(() => (data.auth = true))
      .catch(() => (data.auth = false))
      .finally(() => (data.loading = true));

    return {
      data,
    };
  },
};
</script>

<style>
body {
  margin: 0px;
}
.main-component {
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #f3f4f6;
  background-color: #111827;
  min-height: 100vh;
}
.full-page {
  height: 100%;
  width: 100%;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
