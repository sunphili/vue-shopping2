<template>
  <div id="app">
    <cm-header></cm-header>
    <transition name="fade">
        <router-view></router-view>
    </transition>
  </div>
</template>

<script>
import Header from './components/header'
export default {
  name: 'app',
  components:{
    cmHeader:Header
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  width: 100%;
  height: 100%;
  display: block;
}
</style>
