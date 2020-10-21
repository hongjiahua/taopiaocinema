<template>
  <el-form :rules="rules" class="register-container" label-position="left"
           label-width="0px" v-loading="loading">
    <h3 class="register_title"><span class="el-icon-user-solid" style="font-size: 30px;color: skyblue">用户注册</span></h3>
    <el-form-item prop="account">
      <el-input prefix-icon="el-icon-user" clearable type="text" v-model="username" auto-complete="off"
                placeholder="账号"></el-input>
    </el-form-item>
    <el-form-item prop="checkPhoneNum">
      <el-input prefix-icon="el-icon-phone" clearable v-model="phoneNumber" auto-complete="off"
                placeholder="电话号码"></el-input>
    </el-form-item>
    <el-form-item prop="inputPass">
      <el-input type="password" clearable show-password prefix-icon="el-icon-key" v-model="password" auto-complete="off"
                placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item prop="checkPass">
      <el-input type="password" clearable show-password prefix-icon="el-icon-key" v-model="repeatpassword"
                auto-complete="off"
                placeholder="密码"></el-input>
    </el-form-item>
    <el-form-item style="width: 100%">
      <el-button type="primary" @click="register"
                 :disabled="username==''||password==''||phoneNumber==''||repeatpassword==''" style="width: 100%">立即注册
      </el-button>
      <router-link to="/loginPage" style="text-decoration:none;color: #cac6c6">已有账号? 立即登录</router-link>
    </el-form-item>
  </el-form>
</template>

<script>
  const axios = require('axios')
  export default {
    data () {
      return {
        username: '',
        password: '',
        phoneNumber: '',
        repeatpassword: ''
      }
    },
    methods: {
      register: function () {
        axios.get('http://localhost:8888//user/register',
          {
            params: {
              username: this.username,
              password: this.password,
              phoneNumber: this.phoneNumber
            }
          }
        )
          .then((response) => {
            if (response.data === 'success') {
              this.$message({
                message: '注册成功',
                type: 'success'
              })
            } else {
              this.$message({
                message: '注册失败,用户名已存在',
                type: 'error'
              })
            }
          })
      }
    }
  }
</script>
<style>
  .register-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .register_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  .register_remember {
    margin: 0px 0px 35px 0px;
    text-align: left;
  }
</style>
