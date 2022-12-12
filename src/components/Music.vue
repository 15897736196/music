
<template>
  <div class="root_box">
    <div class="music_box">
      <div class="disc" ref="disc"></div>
      <div class="control">
        <img @click="backMusic" src="../static/image/bg-backward.svg" alt="">
        <img @click="pauseMusic" class="playIcon" :src="paused ? play : pause" alt="" />
        <img @click="forwardMusic" src="../static/image/bg-forward.svg" alt="">
      </div>
    </div>
    
    <audio ref="audio" class="audio_tag" @ended="handleMusicEnded">
      <source ref="source" type="audio/mpeg" preload="auto" />
    </audio>
    
    <MusicWave ref="wave" :paused="paused"></MusicWave>
    <div class="login" @click="loginByNetease">
      <span>login by</span>
      <img src="../static/image/netease.svg" alt="">
    </div>
    <!-- <button @click="getPlayList">点我获取歌单</button> -->
  </div>
</template>

<!-- <script src="https://unpkg.com/wavesurfer.js"></script> -->
<script setup lang="ts">
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import type { Ref } from "vue";
import MusicWave from "@/components/MusicWave/wave.vue"
import play from "../static/image/24gf-play.svg";
import pause from "../static/image/24gf-pause2.svg";
import rapOfChina from "../static/image/rapOfChina.jpg"
import { getUserPlayList } from "@/api/music/playlist";
// import forward from "../static/image/bg-forward.svg";

const router = useRouter()
const audio = ref();
const source = ref();
const disc = ref();
const wave = ref()

let paused: Ref<boolean> = ref(true);//播放、暂停
let count = ref(0)
const playList = reactive([

  {
    musicUrl: 'https://chen41.com/Stitches.mp3',
    pictureUrl: 'https://chen41.com/Stitches.jpg'
  },
  {
    musicUrl: 'https://chen41.com/WayBackHome.mp3',
    pictureUrl: 'https://chen41.com/wayBackHome.jpg'
  },
])
onMounted(() => {
  source.value.src = playList[count.value].musicUrl
  disc.value.style.background = `url(${playList[count.value].pictureUrl})`
  // audio.value.load()
  wave.value.url = playList[count.value].musicUrl
})
function backMusic() {
  if (count.value > 0) {
    count.value--
    // source.value.src = playList[count.value].musicUrl
    wave.value.url = playList[count.value].musicUrl
    
    disc.value.style.background = `url(${playList[count.value].pictureUrl})`
    // audio.value.load()
    // !paused.value && audio.value.play();
    // !paused.value && wave.value.dom.startStop()
  }
}
async function forwardMusic() {
  if (count.value < playList.length - 1) {
    count.value++
    // source.value.src = playList[count.value].musicUrl
    wave.value.url = playList[count.value].musicUrl
    disc.value.style.background = `url(${playList[count.value].pictureUrl})`
    // await wave.value.dom.loadFile()
    // disc.value.style.backgroundSize = 'cover'
    // audio.value.load()
    // !paused.value && audio.value.play();
  }
}
async function pauseMusic() {
  if (wave.value.dom) {
    console.log(paused.value)
    // audio.value.play();
    // paused.value = audio.value.paused;
    disc.value.style.animationPlayState =  paused.value ? 'running' : 'paused'
    paused.value = !paused.value
  }
  //  else if (audio && !paused.value) {
  //   paused.value = audio.value.paused;
  //   disc.value.style.animationPlayState = 'paused'

  //   audio.value.pause();
  //   wave.value.dom.startStop()
  // }
}

function handleMusicEnded() {
  paused.value = true
  disc.value.style.animationPlayState = 'paused'
}

async function getPlayList() {
  const userInfo = localStorage.getItem('userInfo')
  if (userInfo) {
    const uid = JSON.parse(userInfo).uid
    const result = await getUserPlayList(uid)
  }
}



function loginByNetease() {
  router.push('/login/qr')
}
</script>

<style scoped lang="scss">
#waveform{
  // width: 50px;
  // overflow: hidden;
}
.music_box {
  display: flex;
  flex-direction: column;

  align-items: center;
  position: relative;
  margin: 44px auto;
  /* display: flex;
  justify-content: ; */
  width: 40vh;
  min-width: 100px;
  height: 40vh;
  border-radius: 50px;
  background: #292c38;
  box-shadow: 20px 20px 27px #21232d,
    -20px -20px 27px #313543;


}

@keyframes rotate {
  0% {
    -webkit-transform: rotate(0deg);
  }

  25% {
    -webkit-transform: rotate(90deg);
  }

  50% {
    -webkit-transform: rotate(180deg);
  }

  75% {
    -webkit-transform: rotate(270deg);
  }

  100% {
    -webkit-transform: rotate(360deg);
  }
}

.disc {
  position: absolute;
  top: 5%;
  left: 20%;
  display: block;
  height: 0;
  padding: 12vh;
  border-radius: 50%;
  border: none;
  /* background: #824545;
  box-shadow: 30px 30px 53px #5f3232,
    -30px -30px 53px #a55858; */
  // background-image: url(http://120.55.87.229:3000/images/music.5.png);
  background-size: cover !important;
  animation: rotate 20s linear infinite;
  animation-play-state: paused;

  // &::after {
  //   display: block;
  //   content: '';
  //   border-radius: 50%;
  //   position: absolute;
  //   width: 2vh;
  //   height: 2vh;
  //   top: calc(50% - 1.5vh);
  //   left: calc(50% - 1.5vh);
  //   background: rgba(255, 255, 255, 0.922);
  //   border: 5px solid #2d303e;
  // }
}

.playIcon {
  color: white;
  width: 5vh;
  height: 5vh;
}

.audio_tag {
  /* padding-top: 280px; */
  display: block;
  margin: 0 auto;
}

.count_num {
  margin-top: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* justify-content: center; */
}

.control {
  width: 50%;
  margin-top: 80%;
  display: flex;
  justify-content: space-between;

  img {
    width: 4vh;
    height: 4vh;
  }
}

.login {
  // position: relative;
  transform: translateY(3rem);
  line-height: 3rem;
  font-weight: bold;
  color: white;
  margin: 0 auto;
  width: 9rem;
  height: 3rem;
  border-radius: 3rem;
  border: 1px solid #c7c7c7;

  display: flex;
  justify-content: center;

  span {
    margin-left: 1rem;
  }

  img {
    transform: scale(.6);
  }
}

.login:hover {
  border: 1.5px solid #ffffff;
}

// @media (max-width: 1024px) {
//   .login {
//     position: relative;
//     transform: translateY(8vh);
//     line-height: 4vh;
//     text-align: center;
//     font-size: large;
//     font-weight: 900;
//     color: white;
//     margin: 0 auto;
//     width: 19vh;
//     height: 6vh;
//     border-radius: 3vh;
//     border: 1px solid #c18d8d;

//     display: flex;
//     flex-direction: column;

//     // background: #a25757;
//     // box-shadow: 30px 30px 53px #764040,
//     //   -30px -30px 53px #ce6e6e;
//     img {
//       position: absolute;
//       top: -1.5vh;
//       left: 4.5vh;
//       transform: scale(1.9);
//     }
//   }
// }

// @media (max-height: 800px) {
//   .login {
//     transform: translateY(-1vh);
//     line-height: 4vh;
//     text-align: center;
//     font-size: large;
//     font-weight: 900;
//     color: white;
//     margin: 0 auto;
//     width: 23vh;
//     height: 9vh;
//     border-radius: 3vh;
//     border: 1px solid #c18d8d;

//     display: flex;
//     flex-direction: column;

//     // background: #a25757;
//     // box-shadow: 30px 30px 53px #764040,
//     //   -30px -30px 53px #ce6e6e;
//     img {
//       transform: translateY(-9vh);
//     }
//   }
// }
</style>