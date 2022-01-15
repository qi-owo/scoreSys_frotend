<template>
  <div class="box">
    <el-card class="box-card" shadow="hover">
      <div class="login-title">
        学生成绩智能管理信息系统
      </div>
      <div class="login-form">
        <el-form  label-width="80px" >
          <el-form-item label="用户名">
            <el-input v-model="formLabel.userid"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="formLabel.password"></el-input>
          </el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form>
      </div>
    </el-card>

    
  </div>
</template>

<script>
import {setUserRight,setUserInfo} from '../utils/cookie'
export default {
  data() {
    return {
      formLabel: {
        userid: 'superadmin',
        password: 'super'
      }
    }
  },
  methods: {
    onSubmit(){
      this.$api.login(this.formLabel).then((res)=>{
        if(res.message.trim() == '登录成功'){
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          this.$router.replace('/index')
          setUserRight(res.data[0].role)
          setUserInfo(JSON.stringify(res.data[0]))
        }else{
          this.$message.error('登录失败');
        }
      })
    }
  }
}
</script>

<style scoped>
  .box{
    box-sizing: border-box;
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-image: linear-gradient(to top, #505285 0%, #585e92 12%, #65689f 25%, #7474b0 37%, #7e7ebb 50%, #8389c7 62%, #9795d4 75%, #a2a1dc 87%, #b5aee4 100%);
  }
  .box-card {
    text-align: center;
    width: 480px;
  }
  .login-title{
    padding: 30px 0;
    font-size: 20px;
  }
</style>