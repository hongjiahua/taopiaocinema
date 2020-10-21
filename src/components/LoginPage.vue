<template>
  <div>
    <el-form :rules="rules" class="login-container" label-position="left"
             label-width="0px" v-loading="loading">
      <h3 class="login_title"><span class="el-icon-film" style="font-size: 30px;color: #42b983">淘票票单点登录</span></h3>
      <el-form-item prop="account">
        <el-input prefix-icon="el-icon-user" clearable type="text" v-model="username" auto-complete="off"
                  placeholder="账号"></el-input>
      </el-form-item>
      <el-form-item prop="checkPass">
        <el-input type="password" clearable show-password prefix-icon="el-icon-key" v-model="password"
                  auto-complete="off"
                  placeholder="密码"></el-input>
      </el-form-item>
      <el-checkbox class="login_remember" clearable v-model="checked" label-position="left">记住密码</el-checkbox>
      <el-form-item style="width: 100%">
        <el-button type="primary" @click="submitClick" :disabled="username==''||password==''" style="width: 100%">登录
        </el-button>
      </el-form-item>
      <router-link to="/registerPage" style="color: darkgrey;text-decoration: none">注册</router-link>&emsp;
      <router-link to="/registerPage" style="color: darkgrey;text-decoration: none">忘记密码?</router-link>
    </el-form>
  </div>
</template>
<script>
  import {getUrlKey} from '../../static/js/getUrlKey'
  // eslint-disable-next-line no-unused-vars

  const axios = require('axios')
  let token = ''
  export default {
    data () {
      return {
        checked: true,
        url: '/HelloWorld',
        username: '',
        password: '',
        loading: false,
        user: [],
        identity: '',
        token: ''
      }
    },
    created () {
      this.url = getUrlKey('url')
      token = localStorage.getItem('token')
      console.log(localStorage.getItem('token'))
      axios.get('http://localhost:8888//sso/hasKey/', {
        params: {
          'token': token
        }
      })
        .then((response) => {
          if (response.data === true) {
            this.$message(
              {
                message: '登陆过了',
                type: 'warning'
              }
            )
            this.$router.push('/HelloWorld')
          }
        })
    },
    methods: {
      submitClick: function () {
        axios.get('http://localhost:8888//sso/login',
          {
            params: {
              username: this.username,
              password: this.password,
              url: this.url
            }
          }
        )
          .then((response) => {
            this.user = response.data.user
            this.identity = response.data.identity
            this.token = response.data.token
            localStorage.setItem('token', this.token)
            localStorage.setItem('user', JSON.stringify(this.username))
            localStorage.setItem('identity', JSON.stringify(this.identity))
            if (this.token === '' || typeof (this.token) === 'undefined') {
              this.$message({
                message: '验证失败,请检查用户名和密码',
                type: 'error'
              })
            }
            if (this.identity === '管理员') {
              // eslint-disable-next-line no-const-assign

              console.log('令牌' + this.token)
              this.$message({
                message: '欢迎回来:管理员：' + this.username,
                type: 'success'
              })
              if (this.url === '' || this.url === null) {
                this.$router.push('/HelloWorld')
              } else {
                window.location.href = this.url
              }
            } else if (this.identity === '用户') {
              this.$message({
                message: '欢迎回来:用户：' + this.username,
                type: 'success'
              })
              if (this.url === '' || this.url === null) {
                this.$router.push('/HelloWorld')
              } else {
                window.location.href = this.url
              }
            }
          })
          // eslint-disable-next-line handle-callback-err
          .catch((error) => {
            this.$message({
              message: '验证失败',
              type: 'error'
            })
          })
      }
    }
  }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .login_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
