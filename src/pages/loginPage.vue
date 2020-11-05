<template>
    <div id="loginPar">
        <form action="" method="post">
            <div class="item firstLine" id="firstLine">
                <span class="login_title">我要登录</span>
                <span class="login_close" id="close_minilogin">X</span>
            </div>
            <div class="item">
                <label>用户</label>
                <input type="text" name="uname" :value="user" />
            </div>
            <div class="item">
                <label>密码</label>
                <input type="password" name="upwd" :value="password" />
            </div>
            <div class="item">
                <a href="javascript:void(0)" class="btn_login" @click="login">登录</a>
            </div>
        </form>
    </div>
</template>

<script>
export default {
    name: 'loginPage',
    data() {
        return {
            user: '',
            password: '',
            isLogin: false
        }
    },
    created() {
        let isLogin = window.localStorage.getItem('isLogin')
        if (isLogin) {
            this.pushToMap()
        }
    },
    methods: {
        login(){
            // this.isLogin = 
            console.log('wait');
            
            window.localStorage.setItem('isLogin', true)
            this.pushToMap()
        },
        pushToMap() {
            this.$router.push({path: 'map'})
        }
    }
}
</script>

<style>
</style>