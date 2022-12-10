<script setup lang="ts">
defineProps<{
  msg: string;
}>();
</script>

<template>
  <div class="greetings">
    <h1 class="introduction">{{ msg }}</h1>
    <h3>

    </h3>
  </div>
</template>

<style scoped>
/* CDN 服务仅供平台体验和调试使用，平台不承诺服务的稳定性，企业客户需下载字体包自行发布使用并做好备份。 */
@font-face {
  font-family: "阿里妈妈数黑体 Bold";font-weight: 900;src: url("//at.alicdn.com/wf/webfont/DjV9kdQ9DsgN/afy9_2Lc1wkiViSmwtH7w.woff2") format("woff2"),
  url("//at.alicdn.com/wf/webfont/DjV9kdQ9DsgN/MKNOg6hdm07MWVTh98gRT.woff") format("woff");
  font-display: swap;
}
.introduction::before{
  content: "ChenSiyi's bog";
  position: absolute;
  font-weight: 900;
  color: rgb(255, 255, 255);
  font-size: 70px;
  /* transform: translate(-50px, 30px) scaleY(0.5) skew(50deg); */
  filter: blur(2.3px);
  z-index: -1;
  -webkit-mask-image: linear-gradient(transparent, #000);
}
.introduction {
  color: rgb(255, 255, 255);
  font-family: "阿里妈妈数黑体 Bold";
  display: flex;
  justify-content: center;
  font-weight: 900;
  font-size: 70px;

}

@media (max-width: 1024px) {
  .introduction {
    font-size: 40px;
  }
  .introduction::before{
    font-size: 40px;
  }
}
</style>
