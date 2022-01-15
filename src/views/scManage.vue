<template>
<div class="manage-box">
  <h3>导入学生成绩</h3>
  <el-form 
  :rules="rules"
  label-position="left" 
  label-width="80px" 
  :model="formLabelAlign" 
  ref="formLabelAlign" 
  class="add-box">
    <el-form-item
    prop="sno"
    label="学号">
      <el-input v-model="formLabelAlign.sno"></el-input>
    </el-form-item>
    <el-form-item
    prop="cno"
    label="课程号"
    >
      <el-input v-model="formLabelAlign.cno"></el-input>
    </el-form-item>
    <el-form-item
    prop="grade"
    label="分数">
      <el-input v-model="formLabelAlign.grade"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addForm('formLabelAlign')">添加</el-button>
      <el-button @click="resetForm('formLabelAlign')">重置</el-button>
    </el-form-item>
  </el-form>
  <el-table
    :data="scData"
    height="400px"
    style="width: 900px">
    <el-table-column
      type="index"
      width="50">
    </el-table-column>
    <el-table-column
      prop="sno"
      label="学号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="cno"
      label="课程号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="grade"
      label="分数">
    </el-table-column>
    <el-table-column align="center" >
      <template slot="header">
        <el-button type="primary" @click="handleUpload()">导入系统</el-button>
        <el-button @click="handleEmpty()">清空</el-button>
      </template>
      <template slot-scope="scope">
        <el-button
          type="text"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</div>
</template>

<script>
export default {
  data() {
    return {
      scData: [],
      formLabelAlign:{
        sno: "",
        cno: "",
        grade: ""
      },
      rules: {
        sno: [
          { required: true, message: '请输入学号', trigger: 'blur' },
          { pattern: /([0-9]{4})/, message: '请输入正确学号', trigger: 'blur' }
        ],
        cno: [
          {required: true, message: '请输入课程号码', trigger: 'blur'},
          { pattern: /([0-9]{6})/, message: '请输入正确课程号', trigger: 'blur' }
        ],
        grade: [
          {required: true, message: '请输入成绩', trigger: 'blur' },
          {pattern: /^(100|[1-9]?[0-9]?)$/,  message: '请输入正确成绩', trigger: 'blur' }
        ]
      },
      loading: false
    }
  },
  methods: {
    //添加到表格里
    addForm(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
            //深拷贝
            this.scData.push(JSON.parse(JSON.stringify(this.formLabelAlign)))
          } else {
            this.$message({
              type: 'error',
              message: '数据有误'
            });
            return false;
          }
        });
    },
    resetForm(formName){
      this.$refs[formName].resetFields();
    },
    //提交服务器
    handleUpload(){
      this.loading = true
      this.$api.addSc(this.scData).then(res=>{
        if(res.message == '插入成功'){
          this.$message({
            type: 'success',
            message: '导入成功!'
          });
          this.scData = []
          this.loading = false
        }else{
          this.$message({
            type: 'error',
            message: '导入失败,请检查数据'
          });
        }
      }).catch(()=>{
        this.$message({
          type: 'error',
          message: '导入失败'
        });
      })
    },
    //清空表格内容
    handleEmpty(){
      this.$confirm('此操作将清空所有表格数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.scData = []
          this.$message({
            type: 'success',
            message: '清空成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
      });
    },
    //删除表格中的某一项
    handleDelete(index, row) {
      this.$confirm('此操作将从导入列表删除该数据，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.loading = true
          this.scData.splice(index,1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.loading = false
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
      });
    }
  },
}
</script>

<style scoped>
.manage-box{
  min-width: 800px;
}
.add-box{
  width: 400px;
}
</style>
