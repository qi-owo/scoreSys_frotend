<template>
<div>
<el-form 
:inline="true" 
:model="formInline" 
ref="form" 
class="demo-form-inline">
  <el-form-item label="学生姓名" prop="sname">
    <el-input v-model="formInline.sname" :disabled="disabled"></el-input>
  </el-form-item>
  <el-form-item label="学生学号" prop="sno">
    <el-input v-model="formInline.sno" :disabled="disabled"></el-input>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="onSubmit" :disabled="disabled">查询</el-button>
    <el-button @click="resetForm('form')" :disabled="disabled">重置</el-button>
  </el-form-item>
</el-form>
<div class="card-box">
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>学生成绩统计</span>
    </div>
    <div class="item" id="sc-box" style="width:600px;height:400px">
    </div>
  </el-card>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>学生信息</span>
    </div>
    <div class="item" style="width:300px;height:400px">
      <el-descriptions class="margin-top" :column="1" :size="size">
        <el-descriptions-item label="姓名">{{stuInfo.sname}}</el-descriptions-item>
        <el-descriptions-item label="学号">{{stuInfo.sno}}</el-descriptions-item>
        <el-descriptions-item label="性别">{{stuInfo.ssex}}</el-descriptions-item>
        <el-descriptions-item label="户籍">{{stuInfo.birthplace}}</el-descriptions-item>
        <el-descriptions-item label="民族">{{stuInfo.nation}}</el-descriptions-item>
        <el-descriptions-item label="班级">{{stuInfo.class}}</el-descriptions-item>
        <el-descriptions-item label="专业">{{stuInfo.mname}}</el-descriptions-item>
        <el-descriptions-item label="绩点">{{gpa}}</el-descriptions-item>
      </el-descriptions>
    </div>
  </el-card>
</div>
</div>
</template>

<script>
import {getUserRight,getUserInfo} from '../utils/cookie'
export default {
  data() {
    return {
      formInline: {
        sname: '',
        sno: '',
        yname: '',
        mname: '',
        cname: '',
        class: ''
      },
      scData: null,
      stuInfo: {
        sname: '',
        sno: '',
        ssex: '',
        birthplace: '',
        nation: '',
        class: '',
        mname: ''
      },
      size: '',
      gpa: '',
      disabled: false
    }
  },
  mounted() {
    this.drawSC()
    this.init()
  },
  methods: {
    init(){
      const role = getUserRight()
      if(role === 'student'){
        this.disabled = true
        this.formInline.sno = getUserInfo().sno
        this.onSubmit()
      }else{
        this.menuData = this.menuData1
      }
    },
    refresh(){
      this.scData = null
      this.drawSC()
      this.stuInfo = {
        sname: '',
        sno: '',
        ssex: '',
        birthplace: '',
        nation: '',
        class: '',
        mname: ''
      }
      this.gpa = ''
    },
    onSubmit() {
      if(this.formInline.sname === ''&&this.formInline.sno === ''){
        this.$message.error('请输入查询信息')
        this.refresh()
        return
      }
      this.$api.searchAll(this.formInline).then(res=>{
        if(res.message === '获取成功'){
          this.$message({
            message: '查询成功',
            type: 'success'
          });
          let count = 0
          let credit = 0
          this.scData = res.data.map(({ccredit,cname,grade})=>{
            count = count + Number(ccredit) * Number(grade)
            credit = credit + ccredit
            return {
              value:ccredit,
              name:`${cname}：${grade}`
            }
          })
          this.drawSC()
          this.gpa = ((count/credit + count%credit - 50)/10).toFixed(2)
          this.stuInfo = res.data[0]
          this.formInline.sname = this.stuInfo.sname
        }else{
          this.$message.error(res.message);
          this.scData = null
          this.stuInfo = null
        }
      })
    },
    drawSC(){
      let myChart = this.$echarts.init(document.getElementById('sc-box'));
      let option = {
        title: {
          text: '',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: '成绩 - 学分',
            type: 'pie',
            radius: '50%',
            center: ['60%', '60%'],
            data: this.scData,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      myChart.resize({
        width: 600,
        height: 400
      });
      myChart.setOption(option);
    },
    resetForm(formName){
      this.formInline.sname = '',
      this.formInline.sno = ''
      this.refresh()
    }
  }
}
</script>

<style scoped>
.card-box{
  display: flex;
}
.box-card{
  /* width: 400px;
  height: 400px; */
  margin-right: 30px;
}
.item{
  padding: 10px;
}
</style>
