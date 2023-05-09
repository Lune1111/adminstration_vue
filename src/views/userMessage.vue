<template>
  <div>
    <el-button size="small" @click="dialogVisible = true" type="primary" plain>添加用户<i class="el-icon-circle-plus-outline"></i></el-button>
    <el-button size="small" @click="deleteIds" type="danger" plain>批量删除<i class="el-icon-circle-close"></i></el-button>
    <el-button size="small" @click="deleteIds" type="primary" plain>导入<i class="el-icon-upload2"></i></el-button>
    <el-button size="small" @click="deleteIds" type="primary" plain>导出<i class="el-icon-download"></i></el-button>
    <el-table
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
          width="150">
      </el-table-column>
      <el-table-column
          prop="userName"
          label="账户名"
          width="150">
      </el-table-column>
      <el-table-column
          prop="nickName"
          label="昵称"
          width="150">
      </el-table-column>
      <el-table-column
          prop="phonenumber"
          label="手机号"
          width="150">
      </el-table-column>
      <el-table-column
          prop="email"
          label="邮箱"
          width="150">
      </el-table-column>
      <el-table-column prop="sex" label="性别">
        <template slot-scope="scope">
          <span>{{scope.row.sex=='1'?'男':'女'}}</span>
        </template>
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
        <el-form-item label="性别">
          <el-radio v-model="form.sex" label="1">男</el-radio>
          <el-radio v-model="form.sex" label="0">女</el-radio>
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
      radio: '1',
      total:1,
      pageNumber:1,
      pageSize:2,
      labelPosition: 'right',
      centerDialogVisible: false,
      dialogVisible: false,
      tableData: {
        sex:''
      },
      form:{
        userId:'',
        userName: '',
        nickName: '',
        email: '',
        sex: '1',
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
          this.tableData=res.data.rows;
          this.total=res.data.total;
        }else{
          this.openWarning(res.data.message);
        }
      })
    },
    open(msg) {
      this.$message({
        message:msg,
        type:"success"
      })
    },
    openWarning(msg) {
      this.$message({
        message: msg,
        type: "error"
      });
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
    handleClose(done) {
      this.$confirm('确认关闭？')
          // eslint-disable-next-line no-unused-vars
          .then(_ => {
            done();
          })
          // eslint-disable-next-line no-unused-vars
          .catch(_ => {});
    },
    insertUser(){
      axios.post("http://localhost:80/users",this.form).then((res)=>{
        if(res.data.code==202){
          this.open(res.data.message);
          this.getList();
          this.dialogVisible=false;
        }else{
          this.openWarning(res.data.message);
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
          this.open(res.data.message);
          this.getList();
        }else{
          this.openWarning(res.data.message);
        }
      })
    },
    deleteIds(){
      let ids = this.multipleSelection.map(v => v.userId)
      this.$confirm("确定删除数据么?","提示",{type:'warning'}).then(()=>{
        axios.post("http://localhost:80/users/deleteIds",ids).then((res)=>{
          if(res.data.code==204){
            this.getList();
            this.open(res.data.message);
          }else{
            this.openWarning(res.data.message);
          }
        })
      })
    }
  }
}
</script>

<style scoped>

</style>