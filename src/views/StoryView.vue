<script setup>
  import { ref, reactive} from 'vue'
  
  const msg = 
  `<img src="//custom-images.strikinglycdn.com/res/hrscywv4p/image/upload/c_limit,fl_lossy,h_9000,w_1200,f_auto,q_auto/2063236/705519_897247.png" alt="" title="" class="crop-default" data-description="" data-image-link="javascript:void(0);" width="1200" height="auto" style="aspect-ratio: 1200 / 1074;">`+
  `久違好友，Long time on see。雖然我們不時常見面，但憑著一頓美味的聚餐來保持著聯絡，用最原始的純粹，分享給好久不見的您。是我們的品牌初心，也是我們追求的目標。室內陳設大幅跳脫火鍋店的傳統型態，復古黑膠唱機、倒掛高腳杯加上大理石吧台勾勒出既復古又華麗的風格。一時之間誤以為走進了餐酒館，顏色挑選方面，更以土耳其藍取代餐飲業常見的暖色系，水晶燈點綴為空間帶來清爽柔和的視覺效果。產品堅持嚴選新鮮當季食材，每日現熬湯頭，13種口味湯頭搭配變化，呈現完美湯頭入口回韻。最風靡各地饕客殺掉不少人的記憶體與搶佔IG版面的「你儂我籠雙人套餐」。使用兩層或三層的造型鳥籠盛裝現切肉盤，新鮮海鮮，打造視覺、味覺雙重滿足的華麗鍋物。所有的久違都是溫暖的相遇。誰說吃鍋只能暖胃？走進這間有溫度的小石鍋，還能溫暖你心。`


</script>

<template>
<div v-html="msg">
</div>
</template>


<style scoped>
.tilda-petite {
	font-family: tilda-petite,sans-serif;
	font-weight: 400;
	font-style: normal;
  padding-bottom:520%;
}

.header {
  padding: 0;
  margin: 0;
  height: 100%;
  
}
img{
  margin-left:10px; 
  width:5rem;
  height:5rem;
}
</style>