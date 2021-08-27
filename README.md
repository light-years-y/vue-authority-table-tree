# vue-authority-table-tree

> sxy

## install

``` bash
# install dependencies
npm install vue-authority-table-tree --save

import tableTree from 'vue-authority-table-tree'

Vue.use(tableTree)

```

## Example
``` bash
<template>
  <!-- sxy -->
  <table-tree 
    ref="treeDataRef"
    :treeData="treeData" 
  ></table-tree>
  <div class="bottomButton">
    <el-button type="primary" @click="submitFunc()">提交</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData:[],
      selectData:[],
    }
  },
  created(){
    // 获取树形结构数据
    getData().then(res => {
      this.treeData = res.data
    })
  },
  methods: {
    submitFunc() { 
      // 获取已选择的权限数据-数组
      this.selectData = this.$refs.treeDataRef.updateSelectTreeData();
    },
  },
}
</script>

```

## Props
|  Props | type  | description |
|  ----  | ----  |     ----    |
| treeData | Array | Tree structure data |


## Methods
``` bash
<table-tree 
  ref="treeDataRef"
  :treeData="treeData" 
></table-tree>

this.$refs.treeDataRef.updateSelectTreeData();

```
|  method name | params  | description |
|  ----        | ----    |     ----    |
| updateSelectTreeData | null | get select Data |


## Keywords
role-authority   tree   table-tree   vue-components   authority-table-tree


