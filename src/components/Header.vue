<script setup>
import { ref, reactive } from "vue";
import HomeRouter from "./HomeRouter.vue";

const title = ref("LONG TIME NO SEE HOT POT");
const titleImage = ref(
  "https://scontent.frmq2-2.fna.fbcdn.net/v/t1.18169-9/23472489_204682686740871_3300783621293845562_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=g2_Bb87NkCMAX-HRE3Y&_nc_ht=scontent.frmq2-2.fna&oh=00_AT_PoOOEOy2O7iuS-wSJqxNiYQt7KelbHlgK9u4rQs8nyw&oe=63202723"
);

const RouterTree = reactive({
  首頁: { path: "/" },
  久違故事: { path: "story" },
  菜品簡介: { path: "dishIntroduction" },
  線上點餐: { path: "menu" },
});
</script>

<template>
  <div class="container">
    <div class="row align-items-center">
      <div class="col">
        <img :src="titleImage" /><span class="tilda-petite">{{ title }}</span>
      </div>
      <div class="col">
        <template v-for="(item, key, index) in RouterTree">
          <HomeRouter :title="key" :path="item" />
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  margin: 3px 0px 0px 3px;
  width: 6rem;
  height: 7rem;
}
.tilda-petite {
  font-family: tilda-petite, Comic Sans MS, Comic Sans, cursive, sans-serif;
  font-weight: 400;
  font-style: normal;
}
</style>
