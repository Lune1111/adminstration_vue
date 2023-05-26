<template>
  <div class="grade">
    <h1 align="center">用户注册</h1>
    <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="login">
      <el-form-item label="账号" prop="userName">
        <el-input type="userName" v-model="ruleForm.userName" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item label="用户名" prop="nickName">
        <el-input type="nickName" v-model="ruleForm.nickName" autocomplete="on"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
        <el-button @click="resetForm">返回登录</el-button>
      </el-form-item>
    </el-form>
    <!-- 矩形框内容 -->
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "register",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入账号'));
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        password: '',
        userName:'',
      },
      rules: {
        userName: [
          { validator: validatePass, trigger: 'blur' }
        ],
        password: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  beforeCreate () {
    // 例如设置为红色
    document.querySelector('body').setAttribute('style', 'background: linear-gradient(to right, #B0E0E6, #b1dc52);')
  },
  // 销毁前清除（非必须,不清除的话完全可以,这块只不过告诉您可以这么玩）
  beforeDestroy () {
    document.querySelector('body').removeAttribute('style')
  },
  methods: {
    openWarning(msg) {
      this.$message({
        message: msg,
        type: "error"
      });
    },
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          axios.post("http://localhost:80/login/register",this.ruleForm).then((res)=>{
            if(res.data.code==202){
              this.$router.push({path:'/users/home',query:{name:this.ruleForm.userName}});
            }else{
              this.openWarning(res.data.message);
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm() {
     this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.grade {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 520px;
  height:320px;
  background-color: rgb(255, 255, 255);
  border: 2px solid #ffffff;
  border-radius: 20px ;
}
.backcolor{
  background: linear-gradient(to right, #B0E0E6, #b1dc52);
}
.login{
  position: absolute;
  top:25%;
  left: 0;
  right:100px;
  margin: 0 auto;
  width: 500px;
  padding: 5px;
}

</style>