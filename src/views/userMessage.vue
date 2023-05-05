<template>
  <div>
    <el-button size="small" @click="dialogVisible = true" type="primary" plain><i class="el-icon-circle-plus-outline">添加用户</i></el-button>
    <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="light"
        style="width: 100%"
        @selection-change="handleSelectionChange">
      <el-table-column
          type="selection"
          width="55">
      </el-table-column>
      <el-table-column
          prop="userId"
          label="编号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="userName"
          label="账户名"
          width="120">
      </el-table-column>
      <el-table-column
          prop="nickName"
          label="昵称"
          width="120">
      </el-table-column>
      <el-table-column
          prop="phonenumber"
          label="手机号"
          width="120">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱"
          width="120">
      </el-table-column>
      <el-table-column
          prop="sex"
          label="性别"
          width="120">
      </el-table-column>
      <el-table-column
          prop="status"
          label="状态"
          show-overflow-tooltip>
      </el-table-column>
    </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, sizes, prev, pager, next, jumper"
          :total="400">
      </el-pagination>

    <el-dialog
        title="添加用户"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose">
      <el-form :label-position="labelPosition" label-width="80px" :model="form">
        <el-form-item label="用户名">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="昵称">
          <el-input v-model="form.nickName"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.phonenumber"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="insertUser">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "userMessage",
  data() {
    return {
      labelPosition: 'right',
      dialogVisible: false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [{}],
      form:{
        userName: '',
        nickName: '',
        email: '',
        sex: '',
        password: '',
        phonenumber: ''
      },
      multipleSelection: []
    }
  },
  created() {
    this.getList();
  },
  methods: {
    getList(){
      axios.get("http://localhost:80/users").then((res)=>{
        if(res.data.code==201){
          this.tableData=res.data.data;
        }
      })
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    handleClose() {
      this.$confirm('确认关闭？');
    },
    insertUser(){
      console.log(this.form)
      axios.post("http://localhost:80/users",this.form).then((res)=>{
        if(res.data.code==202){
          this.getList();
          this.dialogVisible=false;
        }
      })
    }
  }
}
</script>

<style scoped>

</style>