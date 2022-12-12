<template>
    <div class="wav-suerfer" id="wavsuerfer">
        <canvas id="canvas" height="100" width="300"></canvas>
    </div>
</template>

<script>
import wavSuerfer from "./wave.js"
export default {
    name: 'wave',
    props: {
        paused: { default: false, type: Boolean }
    },
    data() {
        return {
            dom: null,
            // url: 'https://chen41.com/handlesome.mp3'
            url: ''
        }
    },
    watch: {
        async url(cur) {
            await this.loadFile()
            // this.$parent.paused = false
            if (this.paused) {
                //如果图标未暂停,那么下一首歌也自动继续播放
                await this.dom.audioContext.suspend()
            }
        },
        paused(cur) {
            if (cur) {
                this.dom.start()
            } else {
                this.dom.stop()
            }
        }
    },
    mounted() {
        // this.loadFile()
    },
    methods: {
        async loadFile() {
            await this.$nextTick(async () => {
                this.dom && await this.dom.audioContext.close()
                this.dom = new wavSuerfer("canvas", {
                    height: document.getElementById("wavsuerfer").offsetHeight,
                    width: document.getElementById("wavsuerfer").offsetWidth
                })
                await this.loadAudioFile(this.url)
            })
            this.dom.audioContext.onstatechange = () => {
                console.log(this.dom.audioContext.state)
                if (this.dom.audioContext.state === 'suspended') {
                    this.$parent.paused = false
                }
            };
        },
        async loadAudioFile(url) {
            var xhr = new XMLHttpRequest(); //通过XHR下载音频文件
            xhr.open('GET', url, true);
            xhr.responseType = 'arraybuffer';
            const that = this
            xhr.onload = async function (e) { //下载完成
                await that.dom.change(this.response)
            };
            xhr.send();       
            xhr.onreadystatechange = function () {
                if(xhr.readyState == 2){
                    console.log('发送请求成功')
                }
                if (xhr.readyState == 4 && xhr.status == 200) {
                    console.log('接收数据完成')
                }
            };
        }

    }
}
</script>


<style lang="scss" scoped>
.wav-suerfer {
    margin: 0 auto;
    height: 100px;
    width: 300px;
}
</style>