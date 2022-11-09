<template>
  <div class="header">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      msg: 'vip-admin'
    };
  }
};
</script>

<style lang="less" scoped>
.header {
  // margin: 40px 0 0;
  height: 100%;
  width: 100%;
}
</style>
