let AudioContext = null;
let canvasCtx = null

class wavSurfer {
    constructor(id, options) {
        let canvas = document.getElementById(id)
        canvas.width = options.width;
        canvas.height = options.height;
        AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;
        canvasCtx = canvas.getContext("2d");
        this.audioContext = new AudioContext();//实例化
    }
    //播放暂停音频
    start(){
        if (this.audioContext.state === 'running') {
            this.audioContext.suspend().then(function () {
                console.log('播放');
            });
        }
    }
    stop(){
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume().then(function () {
                console.log('暂停');
            });
        }
    }
    // startStop() {
    //     let that = this
    //     if (that.audioContext.state === 'running') {
    //         that.audioContext.suspend().then(function () {
    //             console.log('播放');
    //         });
    //     } else if (that.audioContext.state === 'suspended') {
    //         that.audioContext.resume().then(function () {
    //             console.log('暂停');
    //         });
    //     }
    // }
    change(files) {
        //当选择歌曲时，判断当前audioContext的状态，如果在进行中则关闭音频环境，
        //释放audioContext的所有资源，并重新实例化audioContext
        if (this.audioContext.state == 'running') {
            console.log('实例被销毁')
            this.audioContext.close();
            // canvasCtx.clearRect(0, 0, w, h);
            // canvasCtx = null
            this.audioContext = new AudioContext();
        }
        if (!files || files.length == 0) return;
        this.fileReaderd(files)
    }
    async fileReaderd(files) {
        let that = this
        var count = 0;
        console.log("开始解码")
        var timer = setInterval(function () {
            count++;
            console.log('解码中,已用时' + count + '秒')
        }, 1000)
        await that.audioContext.decodeAudioData(files, function (buffer) {
            clearInterval(timer)
            console.log('解码成功，用时共计:' + count + '秒')
            var audioBufferSourceNode = that.audioContext.createBufferSource();
            var analyser = that.audioContext.createAnalyser();
            analyser.fftSize = 256;//频域数据
            audioBufferSourceNode.connect(analyser);
            analyser.connect(that.audioContext.destination);
            audioBufferSourceNode.buffer = buffer;
            audioBufferSourceNode.start();
            // that.audioContext.suspend().then(function () {
            //     console.log('暂停');
            // });//不让他自动播放
            var bufferLength = analyser.frequencyBinCount;
            var dataArray = new Uint8Array(bufferLength);
            var oW = canvas.width;
            var oH = canvas.height;
            var color1 = canvasCtx.createLinearGradient(oW / 2, oH / 2 - 10, oW / 2, oH / 2 - 2);
            var color2 = canvasCtx.createLinearGradient(oW / 2, oH / 2 + 10, oW / 2, oH / 2 + 2);
            // color1.addColorStop(0, 'RGBA(48, 218, 213, 0.8)');
            color1.addColorStop(0, 'white');
            // color1.addColorStop(.25, '#FF7F50');
            // color1.addColorStop(.5, '#8A2BE2');
            // color1.addColorStop(.75, '#4169E1');
            // color1.addColorStop(1, '#00FFFF');

            // color2.addColorStop(0, '#1E90FF');
            // color2.addColorStop(.25, '#FFD700');
            // color2.addColorStop(.5, '#8A2BE2');
            // color2.addColorStop(.75, '#4169E1');
            // color2.addColorStop(1, '#FF0000');
            // color2.addColorStop(1, 'RGBA(48, 218, 213, 0.8)');
            color2.addColorStop(0, 'white');
            function draw() {
                let drawVisual = requestAnimationFrame(draw);
                var barHeight;
                // 自定义获取数组里边数据的频步
                canvasCtx.clearRect(0, 0, oW, oH);
                for (var i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i] / 8 - 10;//控制波浪频率
                    if (['suspended','closed'].includes(that.audioContext.state) && barHeight === -10) {
                        barHeight = 0
                    }
                    analyser.getByteFrequencyData(dataArray);
                    // 绘制向上的线条
                    canvasCtx.fillStyle = color1;
                    /* context.fillRect(x,y,width,height)
                     * x，y是坐标
                     * width，height线条的宽高
                     */
                    canvasCtx.fillRect(oW / 2 + (i * 8), oH / 2, 2, -barHeight);
                    canvasCtx.fillRect(oW / 2 - (i * 8), oH / 2, 2, -barHeight);
                    // 绘制向下的线条
                    canvasCtx.fillStyle = color2;
                    canvasCtx.fillRect(oW / 2 + (i * 8), oH / 2, 2, barHeight);
                    canvasCtx.fillRect(oW / 2 - (i * 8), oH / 2, 2, barHeight);
                }
            };
            draw();
        })
    }

}
export default wavSurfer
