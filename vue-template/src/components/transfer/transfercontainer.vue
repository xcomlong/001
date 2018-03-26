<template>
  <div class="panel">
    <div class="panel-heading">
      <div class="pull-left">
        <el-checkbox v-model="checkedAllStatus" v-if="showCheckAll" :disabled="checkAllDisabled" @click="toggleAll"></el-checkbox>
      </div>
      <p class="pull-center">{{title}}</p>
      <span class="pull-right ">{{checkedCount}}/{{data.length}}</span>
      <br clearfix/>
    </div>
    <div class="panel-body">
      <div v-for="item in data" :key="item.id">
        <trans-item :options="item" :isRadio="isRadio" :radioValue="radioValue"></trans-item>
      </div>
    </div>
  </div>
</template>
<script>
import TransItem from "./transferitem.vue";
export default {
  name: "transContainer",
  data: () => ({
    radioValue: {
      value: ""
    }
  }),
  props:{
    title:{
      type:String,
      default:'标题'
    },
    data:{},
    isRadio:{
      type:Boolean,
      default:false
    },
    showCheckAll:{
      type:Boolean,
      default:false
    }
  },
  computed: {
    checkAllDisabled() {
      return this.data.length === 0;
    },
    checkedCount() {
      return this.data.filter(item => item.checked).length;
    },
    checkedAllStatus: {
      get() {
        return (
          this.checkedCount === this.data.length && this.checkedCount !== 0
        );
      },
      set(val) {
        this.data.map(item => (item.checked = val));
      }
    }
  },
  watch: {
    radioValue: {
      handler(curVal, oldVal) {
        this.data.map(item => {
          item.checked = item.id == this.radioValue.value;
        });
      },
      deep: true
    }
  },
  methods: {
    toggleAll() {
      const len = this.data.length;
      const slen = this.data.filter(item => item.checked).length;
      this.data.map(item => (item.checked = len !== slen));
    },
    clearRadioValue(){
      this.radioValue.value='';
    }
  },
  components: {
    TransItem
  }
};
</script>
<style scoped>
ul {
  list-style: none;
  padding: 0;
}
.checkbox {
  margin: 0;
}
.clearfix {
  clear: both;
}
.panel {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  font-size: 14px;
  color: #333;
  margin-bottom: 20px;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
}
.panel-heading {
  padding: 10px 15px;
  color: #333;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ddd;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
}
.pull-left {
  float: left !important;
}
.pull-center {
  display: inline-block;
  margin: 0px;
  padding: 0px;
}
.pull-right {
  float: right !important;
}
.panel-body {
  padding: 15px;
}
</style>