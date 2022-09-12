<script setup>
import { RouterLink, RouterView } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Header from "./components/Header.vue";
import { websocket } from "./websocket";

websocket.methods.initWebsocket();
// console.log(websocket.data().stompClient);
</script>

<template>
  <div>
    <Header class="background fixed-top" />
    <div style="height: 8rem"></div>
    <!-- <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
  </header> -->

    <RouterView />
  </div>
</template>

<style scoped>
.background {
  background-image: url(https://img.freepik.com/free-photo/grunge-paint-background_1409-1337.jpg?w=2000);
}
div {
  background-color: rgba(239, 239, 239, 0.915);
}
</style>
