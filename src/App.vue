<template>
  <!-- <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div> -->
    <transition name="fade">
      <router-view></router-view>
  </transition>
</template>

<script>
//import HelloWorld from './components/HelloWorld.vue'

export default {
  // name: 'app',
  // watch: {
  //   $route (to, from) {
  //     if (!to.matched.length) {
  //       this.$router.push('/404')
  //     }
  //   }
  // }
}
</script>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
} */
</style>
