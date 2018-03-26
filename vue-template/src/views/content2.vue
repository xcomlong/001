<template>
   <div>
      <p>我是弹框体. </p>
      {{data.msg}}    
       <el-button type="primary" @click="cancel">取消/关闭弹框</el-button>
   </div>
</template>
<script>
export default {
  data(){
      return {
          val1:''
      }
  },
  props:["data"],
  methods:{
    cancel(){
        this.$emit("click",{type:'close'});
    }
  },
  mounted(){
      
  }
}
</script>