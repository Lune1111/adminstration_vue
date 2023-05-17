<template>
  <el-container style="height: 777px; border: 1px solid #eee">
    <el-aside width="200px">
      <Aside/>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <Header/>
      </el-header>
      <router-view/>
    </el-container>
  </el-container>
</template>

<script>
import Aside from "@/views/Aside";
import Header from "@/views/Header";
export default {
  name: "Manage",
  components: {Header, Aside},
    data() {
    }
}
</script>

<style scoped>
.grad {
  background: linear-gradient(to bottom, #b0ced3, #6c9bb9);
}

.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>