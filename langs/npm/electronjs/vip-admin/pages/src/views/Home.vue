<template>
  <div>
    <el-container id="out">
      <el-header style="height: 80px">
        <Header></Header>
      </el-header>
      <el-container id="in">
        <el-aside style="width: 230px">
          <Nav></Nav>
        </el-aside>
        <el-main>
          <Main></Main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// @ is an alias to /src
import Nav from '@/components/Nav.vue';
import Main from '@/components/Main.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'Home',
  components: {
    Nav,
    Main,
    Header
  }
};
</script>

<style lang="less" scoped>
div {
  height: 100%;
}
.el-header {
  background-color: #545c64;
  color: #67c23a;
  text-align: center;
}

.el-aside {
  background-color: #545c64;
  color: #333;
  // text-align: center;
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
</style>
