<template>
  <!-- 2021.4.9 sxy 角色权限选择组件 -->
  <el-row class="elRow" ref="treeDataRef">
    <el-checkbox-group v-model="selectTreeData" ref="elCheckboxGroup">
      <div v-for="(item1, i) in treeData" :key="item1[id]" class="list-item">
        <el-checkbox
          :label="item1[id]"
          :checked="item1.exist"
          @change="(val) => handleCheckbox(val, item1)"
          >{{ item1[text] }}</el-checkbox
        >
        <div v-if="item1[children]" class="list-item2">
          <div
            v-for="(item2, i2) in item1[children]"
            :key="item2[id]"
            class="list-item2-item"
          >
            <el-checkbox
              :label="item2[id]"
              :checked="item2.exist"
              @change="(val) => handleCheckbox(val, item2, item1[id])"
              >{{ item2[text] }}</el-checkbox
            >
            <div v-if="item2[children]" class="list-item3">
              <div
                v-for="(item3, i3) in item2[children]"
                :key="item3[id]"
                class="list-item3-item"
              >
                <el-checkbox
                  :label="item3[id]"
                  :checked="item3.exist"
                  @change="
                    (val) => handleCheckbox(val, item3, item1[id], item2[id])
                  "
                  >{{ item3[text] }}</el-checkbox
                >
                <div v-if="item3[children]" class="list-item4">
                  <el-checkbox
                    v-for="(item4, i) in item3[children]"
                    :key="item4[id]"
                    :label="item4[id]"
                    :checked="item4.exist"
                    @change="
                      (val) =>
                        handleCheckbox(
                          val,
                          item4,
                          item1[id],
                          item2[id],
                          item3[id]
                        )
                    "
                    >{{ item4[text] }}</el-checkbox
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-checkbox-group>
  </el-row>
</template>

<script>
export default {
  name: "tableTree",
  props: {
    treeData: {
      type: Array,
      default: function() {
        return [];
      },
    },
    treeProps: {
      type: Object,
      default: {
        children: "children",
        text: "permissionName",
        id: "permissionId",
        parentId: "parentId",
      },
    },
  },
  data() {
    return {
      selectTreeData: [],
      children: this.treeProps.children,
      text: this.treeProps.text,
      id: this.treeProps.id,
      parentId: this.treeProps.parentId
    };
  },
  watch: {
    selectTreeData(val) {},
  },
  methods: {
    updateSelectTreeData() {
      return this.selectTreeData;
    },
    resetSelectTreeData() {
      this.selectTreeData = [];
    },
    handleCheckbox(val, currentItem, parentVal) {
      let paArr = [...arguments].slice(2);

      if (val) {
        this.selectTreeData = this.arrPushUnRepeatedFunc(
          this.selectTreeData,
          paArr
        );
        this.recursionAddCheckboxChildFunc(currentItem[this.children]);
      } else {
        this.recursionDeleteCheckboxChildFunc(currentItem[this.children]);
      }
    },
    handleCheckbox2(val, currentItem, rootArr) {
      let paId = currentItem[this.parentId];
      let cuId = currentItem[this.id];

      if (val) {
        this.recursionAddCheckboxChildFunc(currentItem[this.children]);
      } else {
        this.recursionDeleteCheckboxChildFunc(currentItem[this.children]);
      }

      let arr = this.recursionAddCheckboxParentFunc(rootArr, paId);

      this.selectTreeData.push(...arr);
      this.selectTreeData = this.unRepeatedFunc(this.selectTreeData);
    },
    recursionAddCheckboxParentFunc(data, id) {
      for (var i in data) {
        if (data[i][this.id] == id) {
          return [data[i][this.id]];
        }
        if (data[i][this.children]) {
          var ro = this.recursionAddCheckboxParentFunc(data[i][this.children], id);
          if (ro !== undefined) {
            return ro.concat(data[i][this.id]);
          }
        }
      }
    },
    recursionAddCheckboxChildFunc(chData) {
      if (Object.prototype.toString.call(chData) == "[object Array]") {
        chData.forEach((item) => {
          this.selectTreeData = this.arrPushUnRepeatedFunc(
            this.selectTreeData,
            item[this.id]
          );
          this.recursionAddCheckboxChildFunc(item[this.children]);
        });
      } else {
        return;
      }
    },
    recursionDeleteCheckboxChildFunc(chData) {
      if (Object.prototype.toString.call(chData) == "[object Array]") {
        chData.forEach((item) => {
          this.deleteArrEleFunc(this.selectTreeData, item[this.id]);
          this.recursionDeleteCheckboxChildFunc(item[this.children]);
        });
      }
    },
    arrPushUnRepeatedFunc(arr, idData) {
      if (Object.prototype.toString.call(idData) == "[object Array]") {
        arr.push(...idData);
      } else {
        arr.push(idData);
      }

      return Array.from(new Set(arr));
    },
    deleteArrEleFunc(arr, id) {
      let i = arr.indexOf(id);
      if (i != -1) {
        return arr.splice(i, 1);
      }
    },
    unRepeatedFunc(val) {
      return Array.from(new Set(val));
    },
  },
};
</script>

<style lang="scss" scoped>
.elRow {
  margin: 20px 20px 80px 20px;

  .elInputWidth {
    width: 30%;
  }

  .el-checkbox-group {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    font-size: 14px;

    .list-item {
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      min-height: 32px;
      line-height: 32px;
      padding-left: 16px;
      border-top: 1px solid #dcdfe6;

      &:first-child {
        border-top: 0;
      }

      > .el-checkbox {
        display: inline-block;
        width: 130px;
      }

      .list-item2 {
        display: inline-block;
        width: calc(100% - 130px);

        .list-item2-item {
          padding-left: 16px;
          border-top: 1px solid #dcdfe6;
          border-left: 1px solid #dcdfe6;
          font-size: 0;

          &:first-child {
            border-top: 0;
          }

          > .el-checkbox {
            display: inline-block;
            width: 120px;
          }
        }
      }

      .list-item3 {
        display: inline-block;
        width: calc(100% - 120px);
        vertical-align: middle;

        .list-item3-item {
          padding: 0 16px;
          border-top: 1px solid #dcdfe6;
          border-left: 1px solid #dcdfe6;
          box-sizing: border-box;

          &:first-child {
            border-top: 0;
          }

          > .el-checkbox {
            display: inline-block;
            width: 120px;
          }
        }
      }

      .list-item4 {
        display: inline-block;
        padding: 0px 16px;
        border-left: 1px solid #dcdfe6;
      }
    }
  }
}
</style>
