<template>
  <div class="scs-screen login">
    <el-row class="content">
      <div class="logo"></div>
      <el-row>
        <el-form label-width="0px" :model="data" :rules="rule_data" ref="loginForm">
          <el-form-item prop='userId'>
            <el-input type="text" placeholder="账号" v-model="data.userId"
                      :disabled="loading" autofocus @keyup.native.enter="login()"></el-input>
          </el-form-item>
          <el-form-item prop='psw'>
            <el-input type="password" placeholder="密码" v-model="data.password"
                      :disabled="loading" @keyup.native.enter="login()" show-password></el-input>
          </el-form-item>
        </el-form>
        <el-button type="warning" @click="login" :disabled="loading">登录</el-button>
        <!-- <el-button @click="openReg('register')" :disabled="loading">注册</el-button> -->
        <!--
        <el-button type="text" @click="openReg('retrieve')">忘记密码</el-button>
        -->
      </el-row>
    </el-row>
  </div>
</template>

<script>
import common from '@/../src/utils/common'
import baoHttp from '@/utils/ajax'
import { mapActions } from "vuex";

export default {
  data () {
    return {
      data: {
        userId: 'LGG00951',
        password: 'it123456'
      },
      placeholder: {
        name: common.name_txt,
        pass: common.pass_txt,
        email: common.email_txt
      },
      title: {
        register: '用户注册',
        retrieve: '找回密码'
      },
      type: 'register', // register|retrieve
      loading: false,
      rule_data: {
        userId: [{
          required: true,
          message: '帐号不能为空！',
          trigger: 'change'
        }, {
          pattern: common.name_reg,
          message: common.name_txt,
          trigger: 'change'
        }],
        password: [{
          required: true,
          message: '密码不能为空！',
          trigger: 'change'
        }, {
          pattern: common.pass_reg,
          message: common.pass_txt,
          trigger: 'change'
        }]
      },
      err: '',
      form: {
        userId: '',
        password: '',
        psws: '',
        user_email: ''
      }
    }
  },
  mounted () {
  },
  methods: {
    ...mapActions(["setUser", "setShowLogin"]),

    openReg (type) {
      this.$refs.regForm && this.$refs.regForm.resetFields()
      this.type = type
      this.register.visible = true
    },
    login () {
      this.$refs.loginForm.validate(valid => {
        if (valid && !this.loading) {
          this.loading = true
          baoHttp.ajax.call(this, '/user/login', this.data, (data, err) => {
            this.loading = false
            //console.log(err)
            if (!err) {
              if(data.code != '0'){
                this.loading = false
                return
              }
              // 登录信息存到本地
              let user = JSON.stringify(data.user);
              localStorage.setItem("user", user);
              // 登录信息存到vuex
              this.setUser(data.user);
              this.$router.replace('/realShoppingHome')
            }
          })
        }
      })
    }
  },
  watch: {
    'form.userId' () {
      if (this.err.includes('帐号')) this.err = ''
    },
    'form.user_email' () {
      if (this.err.includes('邮箱')) this.err = ''
    }
  }
}
</script>

<style lang="less" scoped>
  @import '../assets/style.css';
  .login {
    background: #373a42 url('../assets/first.jpg') no-repeat center;
    //background: #373a42 url('../assets/202003.jpg') no-repeat center;
    background-size: 100% 100%;
    .el-dialog__body {
      padding-bottom: 0
    }
    .content {
      position: absolute;
      opacity:1;
      top: 50%;
      left: 75%;
      transform: translate(-50%, -70%);
      //background: #E5CFC0;
      //background: rgba(223,202,185,0);
      background: rgba(0,0,0,0);
      background-clip: padding-box;
      //box-shadow: 0 6px 12px rgba(0, 0, 0, .4);
      //border: 5px solid rgba(0, 100, 200, .3);
      padding: 16px;
      width: 15%;
      min-width: 250px;
      max-width: 400px;
      border-radius: 10px;
      .logo {
        background: url('../assets/logo_new.png') no-repeat center 0;
        height: 64px;
        //margin-left:
        margin-bottom: 15px;
      }
      .el-button {
        margin-left: 20px;
        float: right;
      }
      .el-button--small, .el-button--small.is-round {
        //background: rgba(218,121,35,1);
        width:100%;
      }
    }
  }
</style>
