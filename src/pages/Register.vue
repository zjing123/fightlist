<template>
  <div>
    <group>
      <x-input placeholder="账号" v-model="username" required show-clear></x-input>
      <x-input placeholder="邮箱" is-type="email" v-model="email" required show-clear></x-input>
      <x-input placeholder="密码" type="password" :min="6" v-model="password" required show-clear></x-input>
      <x-input placeholder="确认密码" type="password" :min="6" v-model="password_confirm" required show-clear></x-input>
    </group>
    <box gap="10px 10px">
      <x-button type="primary" @click.native="signIn">注册</x-button>
    </box>
    <router-link to="/login" class="to_register" >已注册？去登录</router-link>
  </div>
</template>

<script>
    import { Group, Cell, XHeader, XInput, XButton, Box, Toast } from 'vux'
    import { sendRegister, getFights } from '../api/server'

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
                email: "",
                password: "",
                password_confirm: "",
                isRegister: false
            }
        },
        methods: {
            async signIn () {
                //this.checkData()
                //
                let response
                // try {
                //   response = await getFights()
                //   console.log('res', response)
                // } catch(error) {
                //
                //   console.log('发生错误')
                // }
                try {
                    let data = {username: 'liuchuan4', email: 'liuchuan4@admin.com', password:'1234'}
                    response = await sendRegister(data)
                    console.log('regsi-res', response)
                } catch (err) {
                    console.log('regsi-err', err.response.status)
                }

                if(this.isRegister === true) {

                }
                //console.log('username:' + this.username, '\nemail:' + this.email, '\npassword:' + this.password, '\npassword_confirm:' + this.password_confirm)
            },
            checkData () {
                if (this.username.trim() == '') {
                    this.$vux.toast.text('请输入用户名', 'middle')
                    return false
                }

                if (this.email.trim() == '') {
                    this.$vux.toast.text('请输入E-mail', 'middle')
                    return false
                }

                if(this.password.trim() == '') {
                    this.$vux.toast.text('请输入密码', 'middle')
                    return false
                }

                if(this.password.trim().length < 6) {
                    this.$vux.toast.text('请输入至少6位数的密码', 'middle')
                    return false
                }

                if(this.password_confirm.trim() == '') {
                    this.$vux.toast.text('请输入确认密码', 'middle')
                    return false
                }

                if(this.password.trim() != this.password_confirm.trim()) {
                  this.$vux.toast.text('密码和确认密码不相等', 'middle')
                  return false
                }

                this.isRegister = true
            }
        },
        computed: {
            title() {
              return 'Demo';
            }
        },
        created () {
          //let a = await getFights()
          this.signIn()
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
