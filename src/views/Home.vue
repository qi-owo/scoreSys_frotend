<template>
  <el-container class="container">
      <el-header class="header">
      <el-row>
        <el-col :span="16">
          <div class="grid-content bg-purple">
            学生成绩智能管理信息系统
          </div>
        </el-col>
        <el-col :span="8">
          <div class="grid-content bg-purple-light">
            欢迎您！ 
            <el-button type="text" @click="logOut" icon="el-icon-switch-button">退出</el-button>
          </div>
        </el-col>
      </el-row>
      </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
        <el-menu
          :unique-opened="true" 
          :router="true" 
          class="menu"
          default-active="2"
          @open="handleOpen"
          @close="handleClose">
          <template v-for="(item) in menuData" >
            <el-menu-item :index="item.path" :key="item.path">
              <template slot="title">
                <i class="el-icon-s-home"></i>
                <span slot="title">{{item.name}}</span>
              </template>
            </el-menu-item>
          </template>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import scTable from "./table.vue"
import {removeUserRight,removeUserInfo,getUserRight, getUserInfo} from '../utils/cookie'
export default {
  components: {
    scTable
  },
  data() {
    return {
      menuData:[],
      menuData1:[
        {
          name: '首页',
          path: '/index',
          icon: 'el-icon-s-home',
          order: 1
        },
        {
          name: '学生成绩统计',
          path: '/student',
          icon: 'el-icon-s-data',
          order: 2
        }
      ],
      menuData2: [
        {
          name: '首页',
          path: '/index',
          icon: 'el-icon-s-home',
          order: 1
        },
        {
          name: '学生成绩查询',
          path: '/scTable',
          icon: 'el-icon-menu',
          order: 2
        },{
          name: '学生成绩管理',
          path: '/scManage',
          icon: 'el-icon-setting',
          order: 3
        },{
          name: '学生成绩统计',
          path: '/student',
          icon: 'el-icon-s-data',
          order: 4
        }
      ]
    }
  },
  mounted() {
    this.initMenu()
  },
  methods: {
    initMenu(){
      const role = getUserRight()
      if(role === 'admin'){
        this.menuData = this.menuData2
      }else{
        this.menuData = this.menuData1
      }
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    logOut(){
      this.$message({
        type: 'success',
        message: '退出登录成功'
      })
      this.$router.replace('/')
      removeUserRight()
      removeUserInfo()
    }
  },
}
</script>

<style scoped>
.container {
  height: 100vh;
  font-size: 15px;
}
.header {
  min-width: 800px;
  background-color: #585E92;
  color: #fff;
}
.aside {
  border-right: 1px solid #ccc;
  /* height: 100%; */
}
.main {
  /* height: 100%; */
  color: #212121;
}
.bg-purple{
  font-weight: bold;
  font-size: 20px;
  line-height: 60px;
}
.bg-purple-light{
  line-height: 60px;
  text-align: center;
}
</style>
