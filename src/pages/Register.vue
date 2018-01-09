<template>
  <div>
    <group>
      <x-input placeholder="用户名" v-model="user.username" required show-clear></x-input>
      <x-input placeholder="邮箱" is-type="email" v-model="user.email" required show-clear></x-input>
      <x-input placeholder="密码" type="password" :min="6" v-model="user.password" required show-clear></x-input>
      <x-input placeholder="确认密码" type="password" :min="6" v-model="user.password_confirmation" required show-clear></x-input>
    </group>
    <box gap="10px 10px">
      <x-button type="primary" @click.native="signIn">注册</x-button>
    </box>
    <div v-transfer-dom>
      <loading :show="isLoading" :text="loadingText"></loading>
    </div>
    <router-link to="/login" class="to_register" >已注册？去登录</router-link>
  </div>
</template>

<script>
    import { Group, Cell, XHeader, XInput, XButton, Box, Toast, Loading, TransferDomDirective as TransferDom } from 'vux'
    import { mapState, mapMutations } from 'vuex'
    import _ from 'lodash'
    import { sendRegister, getFights } from '../api/server'

    export default {
        components: {
            Group,
            Cell,
            XHeader,
            XInput,
            XButton,
            Box,
            Toast,
            Loading
        },
        directives: {
            TransferDom
        },
        data () {
            return {
                user: {
                    username: "liuchuan5",
                    email: "liuchuan5@admin.com",
                    password: "liuchuan5",
                    password_confirmation: "liuchuan5",
                },
                isRegister: false,
                loadingText: '注册中...'
            }
        },
        methods: {
            async signIn () {
                this.checkData()

                let response = null
                if(this.isRegister === true) {
                    console.log(this.user)
                    try {
                        response = await sendRegister(this.user)
                        console.log('response', response)
                    } catch (err) {
                        this.$vux.toast.text('发生了错误', 'middle')
                    }

                    if(!response.status && response.errors) {
                        if(response.errors.name) {
                            let error = _.first(response.errors.name)
                            this.$vux.toast.text(error, 'middle')
                            return false
                        }

                        if(response.errors.email) {
                            let error = _.first(response.errors.email)
                            this.$vux.toast.text(error, 'middle')
                            return false
                        }

                        if(response.errors.password) {
                            let error = _.first(response.errors.password)
                            this.$vux.toast.text(error, 'middle')
                            return false
                        }
                    } else if (response.status === true) {
                        //设置用户名，设置token，保存token
                    } else if (response.status == false) {

                    }
                }
            },
            checkData () {
                if (this.user.username.trim() == '') {
                    this.$vux.toast.text('请输入用户名', 'middle')
                    return false
                }

                if (this.user.email.trim() == '') {
                    this.$vux.toast.text('请输入E-mail', 'middle')
                    return false
                }

                if(this.user.password.trim() == '') {
                    this.$vux.toast.text('请输入密码', 'middle')
                    return false
                }

                if(this.user.password.trim().length < 6) {
                    this.$vux.toast.text('请输入至少6位数的密码', 'middle')
                    return false
                }

                if(this.user.password_confirmation.trim() == '') {
                    this.$vux.toast.text('请输入确认密码', 'middle')
                    return false
                }

                if(this.user.password.trim() != this.user.password_confirmation.trim()) {
                  this.$vux.toast.text('密码和确认密码不相等', 'middle')
                  return false
                }

                this.isRegister = true
            }
        },
        computed: {
            ...mapState({
                isLoading: state => state.isLoading
            })
        },
        created () {

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
