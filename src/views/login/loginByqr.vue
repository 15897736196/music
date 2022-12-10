<template>
    <div class="qr_box">
        <img class="qr_img" :src="qrcode" alt="" @click="refreshqr">
        <div class="tip_msg">点击可刷新二维码</div>
        <button @click="UserMsg">点我获取用户歌单信息</button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { getLoginKey, login, checkqr, getLoginStatus, getUserMsg } from '@/api/music/login';
import type { Ref } from "vue";

const qrcode: Ref<string> = ref('')
let timer: any

async function queryqr() {
    const { data: { unikey } } = await getLoginKey()
    const { data: { qrimg } } = await login(unikey)
    qrcode.value = qrimg
    // await setLoop(unikey)
}

async function setLoop(unikey: string) {
    clearInterval(timer)
    timer = setInterval(async () => {
        const { code, cookie, message } = await checkqr(unikey)
        console.log("🚀", message)
        switch (code) {
            case 800:
                await queryqr()
                break;
            case 801:
                break;
            case 802:
                break;
            case 803:
                clearInterval(timer)
                if (cookie) {
                    localStorage.setItem('cookie', cookie)
                    document.cookie = cookie
                }
                console.log('授权登录成功')
                break;
            default:
                break;
        }
    }, 10000)
}

async function refreshqr() {
    console.log('刷新二维码')
    await queryqr()
}
onMounted(async () => {
    //检查用户是否为登录状态
    const { data: { code } } = await checkLoginStatus()
    await queryqr()
    if (code != 200) {
        // await queryqr()
    }
})
onBeforeUnmount(() => {
    clearInterval(timer)
})
async function checkLoginStatus() {
    return await getLoginStatus()
}
async function UserMsg() {
    const data = await getUserMsg()
    if (data.code == 200) {
        localStorage.setItem('userInfo', JSON.stringify(data.account))
    }
}
</script>

<style lang="scss" scoped>
.qr_box {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .qr_img {
        width: 25vh;
        height: 25vh;
    }

    .tip_msg {
        padding-top: 8px;
        color: white;
    }
}
</style>