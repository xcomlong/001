<template>
    <dl>
        <dd class="left">
            <label class="is-required" v-if="options && options.required">*</label>
            <span v-else>&nbsp;</span>
        </dd>
        <dd class="right">
             <el-radio v-if="isRadio" v-model="radioValue.value" :label="options.id" class="margin-left-checkbox" >{{options.label}}</el-radio>
            <el-checkbox v-else v-model="options.checked" class="margin-left-checkbox">{{options.label}}</el-checkbox>
        </dd>
        <br class="clearfix" />
    </dl>
</template>
<script>
export default {
  name: "TransItem",
  data: () => ({}),
  props: {
    options: {
      checked: {
        type: Boolean,
        default: false
      },
      label: {
        type: String,
        default: ""
      },
      required: {
        type: Boolean,
        default: false
      },
      id: {
        type: String,
        default: ""
      }
    },
    isRadio: {
      type: Boolean,
      default: false
    },
    radioValue: {
      value: {}
    }
  },
  methods: {}
};
</script>
<style scoped>
.clearfix {
  clear: both;
}
dd {
  margin: 0px;
  padding: 0px;
  float: left;
}
.left {
  text-align: right;
  width: 10%;
}
.right {
  text-align: left;
  width: 90%;
}
.is-required {
  color: red;
  padding-right: 10px;
  position: relative;
  top: 2px;
}

dd.right label {
  display: block;
}
</style>


