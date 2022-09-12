<script setup>
import {ref, onMounted } from 'vue';
const count = ref(0)
const props = defineProps({
  image: String,
  name: String,
  desc: String,
  price: Number,
})
</script>

<template>
  <div class="row align-items-start">
    <div class="col-sm-6">
     <img :src="image"/><div style="overflow:auto;font-size:xx-small;">{{desc}}</div>
    </div>
    <div class="col">
      <span style="top:40%;">{{name}}</span>
    </div>
    <div class="col">
       <div style="top:40%;">{{price}}</div>
    </div>
    <div class="col">
      <div style="top:40%;left: 30%;width: 80%;">{{count}}</div>
      <div class="d-grid gap-2">
        <button class="btn btn-primary" type="button" @click="$emit('order-dish', ++count, name, price)">+1</button>
        <button class="btn btn-primary" type="button" :disabled="count <= 0" @click="$emit('order-dish', --count, name, price)">-1</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
div.col,div.col-sm-6 {
   border-style: outset;
   display:flex;
   height: 100px;
}
</style>
