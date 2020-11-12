<template>
  <div id="app">
    <router-view id="view"></router-view>
  </div>
</template>

<style lang="less">
html {
  height: 100%;
}
body {
  height: inherit;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: inherit;
}
#view {
  height: inherit;
}
</style>
