<template>
  <div id="app">
    <img src="./assets/logo.png">
    <h1>{{ msg }}</h1>
    <div>
      <el-button>默认按钮</el-button>
      <el-button type="primary" @click="open1">主要按钮   1.只打开弹框，无需执行回调</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
    </div>
    
    <div id="test"></div>
    <test01></test01>
  </div>
</template>

<script>
import content1 from "./views/child1";
import test01 from "./views/test01";
$(function(){
             $("#test").html('this is my first application.');
        });
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods:{
    open1() {
      let option = {
        title: "只打开弹框，无需执行回调",
        component: content1,
        size: "small",
        data: { msg: "hello：我是父组件传入过来的值。" }
      };
      this.dialog.show(option).then(e=>{
        window.alert(e.type);
      });
    },
  },
  components:{
    test01
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
