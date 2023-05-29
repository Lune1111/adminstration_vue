<template>
    <div>
      <el-breadcrumb-item :to="{ path: '' }">{{this.$route.name}}</el-breadcrumb-item>
      <el-dropdown>
       <span class="el-dropdown-link">
    {{this.name}}<i class="el-icon-arrow-down el-icon--right"></i>
  </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>查看</el-dropdown-item>
          <el-dropdown-item>新增</el-dropdown-item>
          <el-dropdown-item @click.native="backUp">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
  </div>
</template>
<script>

export default {
  name: "Header",
  data() {
    return {
      name: '',
      tabPosition: 'left',
    }
  },
  created() {
    this.nowUser();
  },
  methods: {
    nowUser() {
     this.name=this.$route.query.name;
    },
    backUp() {
      this.$router.push('/');
    },
    handleClick(tab, event) {
      console.log(tab, event);
    }
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