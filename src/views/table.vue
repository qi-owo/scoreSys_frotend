<template>
    <div>
      <div class="input">
        <div class="input-box">
          <div class="input-title">姓名：</div>
          <el-input v-model="inputData.sname" placeholder="请输入内容"></el-input>
        </div>
        <div class="input-box">
          <div class="input-title">学号：</div>
          <el-input v-model="inputData.sno" placeholder="请输入内容"></el-input>
        </div>
        <div class="input-box">
          <div class="input-title">学院：</div>
          <el-input v-model="inputData.yname" placeholder="请输入内容"></el-input>
        </div>
        <div class="input-box">
          <div class="input-title">专业：</div>
          <el-input v-model="inputData.mname" placeholder="请输入内容"></el-input>
        </div>
        <div class="input-box">
          <div class="input-title">班级：</div>
          <el-input v-model="inputData.class" placeholder="请输入内容"></el-input>
        </div>
        <div class="input-box">
          <div class="input-title">课程：</div>
          <el-input v-model="inputData.cname" placeholder="请输入内容"></el-input>
        </div>
        <div class="input-box">
          <el-button type="primary" @click="searchAll">查询</el-button>
          <el-button type="primary" @click="download">导出</el-button>
        </div>
      </div>
      <el-table
        :data="tableData"
        v-loading="loading"
        border
        height="600"
        style="width: 100%">
        <el-table-column
          prop="sno"
          label="学号"
          sortable
          width="180">
        </el-table-column>
        <el-table-column
          prop="sname"
          label="姓名"
          width="180">
          <template slot-scope="scope">
            <el-popover trigger="hover" placement="top">
              <p>姓名: {{ scope.row.sname }}</p>
              <p>性别：{{ scope.row.ssex }}</p>
              <p>住址: {{ scope.row.birthplace }}</p>
              <div slot="reference" class="name-wrapper">
                <el-tag size="medium">{{ scope.row.sname }}</el-tag>
              </div>
            </el-popover>
          </template>
        </el-table-column>
        <el-table-column
          prop="yname"
          width="180"
          label="学院">
        </el-table-column>
        <el-table-column
          prop="mname"
          label="专业"
          width="180">
        </el-table-column>
        <el-table-column
          prop="class"
          label="班级"
          width="180">
        </el-table-column>
        <el-table-column
          prop="cname"
          width="180"
          label="课程">
        </el-table-column>
        <el-table-column
          prop="grade"
          label="分数"
          sortable
          width="120"
          >
        </el-table-column>
        <el-table-column
        fixed="right"
        label="操作"
        min-width="120px"
        >
        <template slot-scope="scope">
          <el-button type="text" @click="handleRevise(scope.row)" size="small">修改</el-button>
          <el-button type="text" @click="handleDelete(scope.row)" size="small">删除</el-button>
        </template>
      </el-table-column>
      </el-table>
    </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'scTable',
  components: {
  },
  data() {
    return {
      tableData:[],
      loading: true,
      inputData: {
        sname: '',
        sno: '',
        yname: '',
        mname: '',
        cname: '',
        class: ''
      }
    }
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    getTableData() {
      this.$api.getTableData().then(res=>{
        if(res.message === '获取成功'){
          this.tableData = res.data
          this.loading = false
        }
      })
    },
    handleRevise(row) {
      this.$prompt('请输入正确成绩', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^(100|[1-9]?[0-9]?)$/,
          inputErrorMessage: '输入不正确'
        }).then(({ value }) => {
          const params = {
            cno: row.cno,
            sno: row.sno,
            grade: value
          }
          console.log('ok');
          this.$api.reviseSc(params).then(res=>{
            if(res.message === '修改成功'){
              this.$message({
                type: 'success',
                message: '成绩已修改为 : ' + value
              });
              this.searchAll();
            }else{
              this.$message(res.message)
            }
          }).catch(()=>{
            this.$message.error('修改失败')
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消修改'
          });       
        });
    },
    handleDelete(row) {
      const params = {
        cno: row.cno,
        sno: row.sno
      }
      this.$confirm('此操作将永久删除该成绩数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$api.deleteSc(params).then(res=>{
            if(res.message === '删除成功'){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.searchAll();
            }else{
              this.$message(res.message)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
      });
    },
    searchAll() {
      this.loading = true
      this.$api.searchAll(this.inputData).then(res=>{
        if(res.message === '获取成功'){
          this.$message({
            message: '查询成功',
            type: 'success'
          });
          this.tableData = res.data
          this.loading = false
        }else{
          this.$message.error(res.message);
          this.tableData = null
          this.loading = false
        }
      })
    },
    download(){
      require.ensure([], () => {
        const { export_json_to_excel } = require("../vendor/Export2Excel");
        const tHeader = ['学院','专业','班级','课程','姓名','分数']; //表头
        const filterVal =  ['yname', 'mname', 'class', 'cname', 'sname','grade'];//对应字段
        const list =  this.tableData;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, "score");
      })
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  }
}
</script>

<style scoped>
  .input{
    min-width: 800px;
    padding: 20px 0;
    display: flex;
    flex-wrap: wrap;
  }
  .input-box{
    display: flex;
    width: 220px;
    line-height: 40px;
    margin-right: 20px;
    margin-top: 10px;
  }
  .input-title{
    width: 60px;
  }
</style>
