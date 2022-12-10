<template>
    <div>
        <nav class="login_nav">
            <router-link active-class="cur_tab" class="link_style" to="/login/shortMsg">手机验证码登录</router-link>
            <router-link active-class="cur_tab" class="link_style" to="/login/qr">二维码登录</router-link>
        </nav>
        <router-view></router-view>
    </div>
</template>

<script setup lang="ts">

</script>

<style lang="scss" scoped>
.login_nav {
    display: flex;
    justify-content: center;
}
.link_style {
    margin: 24px 12px 0;
    text-decoration: none;
    color: white;
}

.cur_tab {
    font-size: large;
    font-weight: 900;
}
</style>