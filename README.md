# vue-authority-table-tree

> sxy

## install

```bash
# install dependencies
npm install vue-authority-table-tree --save

import tableTree from 'vue-authority-table-tree'

Vue.use(tableTree)

```

## Example

```bash
<template>
  <!-- sxy -->
  <table-tree
    ref="treeDataRef"
    :treeData="treeData"
  ></table-tree>
  <div class="bottomButton">
    <el-button type="primary" @click="submitFunc()">提交</el-button>
    <el-button type="primary" @click="clearBtn()">清空</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      treeData:[],
      treeProps: {
				children: "children",
				text: "treeName",
				id: "treeId",
			},
      selectData:[],
    }
  },
  created(){
    // 获取树形结构数据
    getData().then(res => {
      this.treeData = [
        {
          "treeId": 97,
          "parentId": 0,
          "treeName": "app管理",
          "children": [
            {
              "treeId": 98,
              "parentId": 97,
              "treeName": "app类目管理"
            },
            {
              "treeId": 99,
              "parentId": 97,
              "treeName": "app版本管理",
              "children": [
                {
                  "treeId": 100,
                  "parentId": 99,
                  "treeName": "app版本列表"
                },
                {
                  "treeId": 101,
                  "parentId": 99,
                  "treeName": "新增版本"
                }
              ]
            }
          ]
        }
      ]
    })
  },
  methods: {
    submitFunc() {
      // 获取已选择的权限数据-数组
      this.selectData = this.$refs.treeDataRef.updateSelectTreeData();
    },
    clearBtn() {
      // 清空已选择数据
			this.$refs.treeDataRef.resetSelectTreeData()
		},
  },
}
</script>

```

## Props

| Props    | type  | description         |
| -------- | ----- | ------------------- |
| treeData | Array | Tree structure data |
| treeProps | Object | tree props |

## Methods

```bash
<table-tree
  ref="treeDataRef"
  :treeData="treeData"
></table-tree>

this.$refs.treeDataRef.updateSelectTreeData();
this.$refs.treeDataRef.resetSelectTreeData();

```

| method name          | params | description     |
| -------------------- | ------ | --------------- |
| updateSelectTreeData | null   | get select Data |
| resetSelectTreeData | null   | reset select Data |

## Keywords

role-authority tree table-tree vue-components authority-table-tree
