<template>
  <div id="out">
    <el-container id="all-container">
      <el-header>Header</el-header>
      <el-container id="up-container">
        <el-aside width="20%">Aside</el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
// import Nav from '@/components/Nav.vue';
// import Main from '@/components/Main.vue';

export default {
  name: 'Home',
  components: {
    // Nav,
    // Main
  }
};
</script>

<style lang="less" scoped>
.out {
  height: inherit;
}
#all-container {
  height: 100%;
}
#up-container {
  height: 70%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  height: 20%;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}
</style>
