<template>
  <div>
    <group>
      <x-input placeholder="邮箱" v-model="user.email" is-type="email" required show-clear></x-input>
      <x-input placeholder="密码" type="password" v-model="user.password" required show-clear></x-input>
    </group>
    <box gap="10px 10px">
      <x-button type="primary" @click.native="userLogin">登录</x-button>
    </box>
    <div v-transfer-dom>
      <loading :show="isLoading" :text="loadingText"></loading>
    </div>
    <router-link to="/register" class="to_register" >还没注册？去注册</router-link>
  </div>
</template>

<script>
    import { Group, Cell, XHeader, XInput, XButton, Box, Toast, Loading, TransferDomDirective as TransferDom } from 'vux'
    import { mapState, mapMutations } from 'vuex'
    import { sendLogin } from '@/api/server'

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
                    email: "liuchuan5@admin.com",
                    password: "liuchuan5"
                },
                isLogin: false,
                loadingText: '登录中...'
            }
        },
        methods: {
            ...mapMutations([
                'RECORD_USERINFO',
                'SET_ACCESS_TOKENS'
            ]),
            async userLogin () {
                this.checkData();

                let response;
                if(this.isLogin === true) {
                    try {
                        response = await sendLogin(this.user)
                    } catch (err) {
                        console.log(err)
                        this.$vux.toast.text('发生了错误1', 'middle')
                        return;
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
                        this.RECORD_USERINFO(response.data.user);
                        this.SET_ACCESS_TOKENS(response.data.tokens);
                        this.$vux.toast.text('登录成功!', 'middle')
                        this.$router.push({name: 'Home'})
                    } else if (response.status == false) {
                        this.$vux.toast.text(response.message, 'middle')
                    }
                }
            },
            checkData () {
                if(this.user.email.trim() == "") {
                    this.$vux.toast.text('请输入邮箱', 'middle');
                    this.isLogin = false;
                    return;
                }

                if(this.user.password.trim() == '') {
                  this.$vux.toast.text('请输入密码', 'middle');
                  this.isLogin = false;
                  return;
                }

                this.isLogin = true;
            }
        },
        computed: {
            ...mapState({
              isLoading: state => state.isLoading
            })
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
