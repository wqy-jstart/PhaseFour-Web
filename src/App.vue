<template>
  <div id="app">
    <router-view/> <!-- 负责显示与路由绑定的所有视图 -->
  </div>
</template>

<style>
*{ /* 所有的外边距都为0 */
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
