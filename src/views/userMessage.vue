<template>
  <div>
    <el-button size="small" @click="dialogVisible = true" type="primary" plain>添加用户<i class="el-icon-circle-plus-outline"></i></el-button>
    <el-button size="small" @click="dialogVisible = true" type="danger" plain>批量删除<i class="el-icon-circle-close"></i></el-button>
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
        <el-table-column>
          <teleport slot-scope="scope">
          <el-button size="small" @click="updateUser(scope.row)" type="warning" plain>修改用户<i class="el-icon-star-off"></i></el-button>
          </teleport>
        </el-table-column>
    </el-table>
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="pageNumber"
          :page-sizes="[2,5,10,20]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>

<!--    添加用户的弹窗页面-->
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
<!--    编辑用户页面的弹窗-->
    <el-dialog
        title="编辑用户信息"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
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
    <el-button @click="centerDialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="updateUserPut">确 定</el-button>
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
      total:1,
      pageNumber:1,
      pageSize:2,
      labelPosition: 'right',
      centerDialogVisible: false,
      dialogVisible: false,
      currentPage1: 5,
      currentPage2: 5,
      currentPage3: 5,
      currentPage4: 4,
      tableData: [{}],
      form:{
        userId:'',
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
      axios.get("http://localhost:80/users?pageNumber="+this.pageNumber+"&pageSize="+this.pageSize).then((res)=>{
        if(res.data.code==201){
          this.tableData=res.data.data;
          this.total=res.data.total;
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
      this.pageSize=val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageNumber=val;
      this.getList();
    },
    handleClose() {
      this.$confirm('确认关闭？');
    },
    insertUser(){
      axios.post("http://localhost:80/users",this.form).then((res)=>{
        if(res.data.code==202){
          this.getList();
          this.dialogVisible=false;
        }
      })
    },
    updateUser(row){
      this.form= row;
      this.centerDialogVisible=true;
    },
    updateUserPut(){
      axios.put("http://localhost:80/users",this.form).then((res)=>{
        if(res.data.code==203){
          this.centerDialogVisible=false;
          this.getList();
        }
      })
    }
  }
}
</script>

<style scoped>

</style>