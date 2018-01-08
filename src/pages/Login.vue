<template>
  <div>
    <group>
      <x-input placeholder="账号" v-model="username" required show-clear></x-input>
      <x-input placeholder="密码" type="password" v-model="password" required show-clear></x-input>
    </group>
    <box gap="10px 10px">
      <x-button type="primary" @click.native="userLogin">登录</x-button>
    </box>
    <router-link to="/register" class="to_register" >还没注册？去注册</router-link>
  </div>
</template>

<script>
    import { Group, Cell, XHeader, XInput, XButton, Box, Toast } from 'vux'

    export default {
        components: {
            Group,
            Cell,
            XHeader,
            XInput,
            XButton,
            Box,
            Toast
        },
        data () {
            return {
                username: "",
                password: "",
                isLogin: false
            }
        },
        methods: {
            userLogin () {
                console.log('username:' + this.username, '\nemail:' + this.email, '\npassword:' + this.password, '\npassword_confirm:' + this.password_confirm)
                this.checkData()

                if(this.isLogin) {

                }
            },
            checkData () {

                if(this.username.trim() == "" || this.password.trim() == "") {
                    this.$vux.toast.text('请输入数据', 'middle')
                    this.isLogin = false
                } else {
                    this.isLogin = true
                }
            }
        },
        computed: {
            title() {
              return 'Demo';
            }
        }
    }
</script>

<style>
    html,body{
        height: 100%;
        width: 100%;
        background-color: #F5F5F5;
    }

    .logo {
        width: 100px;
        height: 100px
    }

    .login_tips{
        font-size: .7rem;
        color: red;
        padding: .4rem .6rem;
        line-height: .5rem;
    }

    .log_tips a {
        color: #3b95e9;
    }

    .to_register{
        float: right;
        font-size: .8rem;
        color: #3b95e9;
        margin-right: .3rem;
    }
</style>
