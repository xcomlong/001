<template>
  <table>
    <tr>
      <td>
        <trans-container ref="fromRef" :title="fromTitle" :data="fromData" :isRadio="true"></trans-container>
      </td>
      <td>
        <trans-container ref="toRef" :title="toTitle" :data="toData" :isRadio="true"></trans-container>
      </td>
      <td class="td-column-center">
        <p>
          <el-button type="primary" :disabled="toRightDisable" @click="toRight">&gt;&gt;</el-button>
        </p>
        <p>
          <el-button type="primary" :disabled="toLeftDisable" @click="toLeft">&lt;&lt;</el-button>
        </p>
      </td>
      <td>
        <trans-container :title="mapTitle" :data="mapData" :showCheckAll="true"></trans-container>
      </td>
    </tr>
  </table>
</template>
<script>
  import TransContainer from "./transfercontainer.vue";
  import {
    TestData1,
    TestData2
  } from "../../static/testData";
  export default {
    name: "transform",
    data: () => ({
      fromTitle: "导入字段",
      toTitle: "Wms字段",
      mapTitle: "映射结果",
      fromData: TestData1,
      toData: TestData2,
      mapData: [],
      templateType: 'Import'
    }),
    methods: {
      exchange(fd, td) {
        let selectedItem = fd.filter(item => item.checked).map(item => {
          return {
            ...item,
            checked: false
          };
        });
        td.push(...selectedItem);
        return fd.filter(item => !item.checked);
      },
      exchangeToRight(fd, td, md) {
        let from = fd.filter(item => item.checked).map(item => {
            return {
              ...item,
              checked: false
            };
          })[0],
          to = td.filter(item => item.checked).map(item => {
            return {
              ...item,
              checked: false
            };
          });
        let map = Object.assign({}, from);
        map.type = "Map";
        map.from.push(from);
        let idArray = [],
          labelArray = [];
        for (let item of to) {
          idArray.push(item.id);
          labelArray.push(item.label);
          map.classType.push(...item.classType);
          map.to.push(item);
        }
        map.id = map.id + '_' + idArray.join('_');
        map.label = map.label + ' => ' + labelArray.join(',');
        md.push(map);
        this.fromData = fd.filter(item => !item.checked);
        this.toData = td.filter(item => !item.checked);
      },
      exchangeToLeft(fd, td, md) {
        let maps = md.filter(item => item.checked);
        for (let map of maps) {
          this.fromData.push({
            ...map.from[0],
            checked: false,
            to:[]
          });
          for (let item of map.to) {
            this.toData.push({
              ...item,
              checked: false,
              to:[]
            });
          }
        }
        this.fromData = this.fromData.sort((a, b) => a.id - b.id);
        this.toData = this.toData.sort((a, b) => a.id - b.id);
        this.mapData = md.filter(item => !item.checked);
      },
      // 把选择数据转移到目标（右框）
      toRight() {
        this.exchangeToRight(this.fromData, this.toData, this.mapData);
      },
      // 把选择数据转回到源（左框）
      toLeft() {
        this.$refs.fromRef.clearRadioValue();
        this.$refs.toRef.clearRadioValue();
        this.exchangeToLeft(this.fromData, this.toData, this.mapData);
        console.log(this.fromData);
      }
    },
    computed: {
      toRightDisable() {
        return this.fromData.length === 0 || this.fromRefNum === 0 || this.toData.length === 0 || this.toRefNum === 0;
      },
      toLeftDisable() {
        return this.mapData.length === 0 || this.mapRefNum === 0;
      },
      fromRefNum() {
        return this.fromData.filter(item => item.checked).length;
      },
      toRefNum() {
        return this.toData.filter(item => item.checked).length;
      },
      mapRefNum() {
        return this.mapData.filter(item => item.checked).length;
      }
    },
    components: {
      TransContainer
    }
  };
</script>
<style scoped>
  table {
    width: 100%;
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    vertical-align: top;
    color: #2c3e50;
  }
  table tr td {
    vertical-align: top;
    padding: 0px 10px;
  }
  .td-column-center {
    vertical-align: middle;
  }
</style>
