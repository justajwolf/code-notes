<template>
  <div>
    <el-container id="out">
      <el-header>Header</el-header>
      <el-container id="in">
        <el-aside>Aside</el-aside>
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
div {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  vertical-align: middle;
  height: 30%;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  height: 100%;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: 100%;
}

#out {
  margin: 0;
  height: 100%;
}

#in {
  height: 70%;
}
</style>
