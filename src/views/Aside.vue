<template>
  <div>
    <el-menu router class="grad" text-color="black">
      <el-menu-item index="999" :route="{ path: '/users/home' }" style="text-align:left !important">
        <i class="el-icon-location"></i>
        <span class="el-menu-item-name" style="margin-left: 0">主页</span>
      </el-menu-item>
      <el-menu-item index="/users/user"><i class="el-icon-notebook-2"></i>用户管理</el-menu-item>
      <el-menu-item index="/users/mymessage"><i class="el-icon-user"></i>个人信息</el-menu-item>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>导航三</template>
        <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="3-1">选项1</el-menu-item>
          <el-menu-item index="3-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="3-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="3-4">
          <template slot="title">选项4</template>
          <el-menu-item index="3-4-1">选项4-1</el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: "Aside"
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