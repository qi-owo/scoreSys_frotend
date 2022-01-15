<template>
<div>
  <el-descriptions class="margin-top" title="用户信息" :column="3" :size="size" border>
    <template slot="extra">
      <el-button type="primary" size="small" @click="UpdatePassword()">修改密码</el-button>
    </template>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-user"></i>
        用户名
      </template>
      {{userInfo.userid}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-mobile-phone"></i>
        手机号
      </template>
      {{userInfo.phonenum}}
    </el-descriptions-item>
    <el-descriptions-item>
      <template slot="label">
        <i class="el-icon-tickets"></i>
        用户身份
      </template>
      <el-tag size="small">{{userInfo.role}}</el-tag>
    </el-descriptions-item>
  </el-descriptions>
</div>
</template>

<script>
import {getUserInfo} from '../utils/cookie'
export default {
  data() {
    return {
      userInfo: {},
      size: ''
    }
  },
  mounted() {
    this.initInfo()
  },
  methods: {
    initInfo(){
      this.userInfo = getUserInfo()
    },
    UpdatePassword(){
      this.$prompt('请输入新密码', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({ value }) => {
          const params = {
            password: value,
            userid: this.userInfo.userid
          }
          this.$api.revisePassword(params).then(res=>{
            if(res.message === '修改成功'){
              this.$message({
                type: 'success',
                message: '密码已修改' 
              });
            }else{
              this.$message(res.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
    }
  }
}
</script>

<style scoped>

</style>
