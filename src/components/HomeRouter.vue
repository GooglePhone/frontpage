<script setup>
const props = defineProps({
  title: String,
  path: String
})
</script>

<template>
   <RouterLink class="router" :to="path">{{title}}</RouterLink>
</template>


<style scoped>
.router {
  color:black;
  margin:0.2rem;
  font-size: rem;
  font-family:"微軟正黑體";
  font-weight: bold;
  position:bottom;
  text-align: center;
  top: 80%;
}
</style>