<template>
  <!-- 2021.4.9 sxy 角色权限选择组件 -->
  <el-row class="elRow" ref="treeDataRef">
    <el-checkbox-group v-model="selectTreeData" ref="elCheckboxGroup">
      <div
        v-for="(item1, i) in treeData"
        :key="item1.permissionId"
        class="list-item"
      >
        <el-checkbox
          :label="item1.permissionId"
          :checked="item1.exist"
          @change="val => handleCheckbox(val, item1)"
          >{{ item1.permissionName }}</el-checkbox
        >
        <div v-if="item1.children" class="list-item2">
          <div
            v-for="(item2, i2) in item1.children"
            :key="item2.permissionId"
            class="list-item2-item"
          >
            <el-checkbox
              :label="item2.permissionId"
              :checked="item2.exist"
              @change="val => handleCheckbox(val, item2, item1.permissionId)"
              >{{ item2.permissionName }}</el-checkbox
            >
            <div v-if="item2.children" class="list-item3">
              <div
                v-for="(item3, i3) in item2.children"
                :key="item3.permissionId"
                class="list-item3-item"
              >
                <el-checkbox
                  :label="item3.permissionId"
                  :checked="item3.exist"
                  @change="
                    val =>
                      handleCheckbox(
                        val,
                        item3,
                        item1.permissionId,
                        item2.permissionId
                      )
                  "
                  >{{ item3.permissionName }}</el-checkbox
                >
                <div v-if="item3.children" class="list-item4">
                  <el-checkbox
                    v-for="(item4, i) in item3.children"
                    :key="item4.permissionId"
                    :label="item4.permissionId"
                    :checked="item4.exist"
                    @change="
                      val =>
                        handleCheckbox(
                          val,
                          item4,
                          item1.permissionId,
                          item2.permissionId,
                          item3.permissionId
                        )
                    "
                    >{{ item4.permissionName }}</el-checkbox
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
      }
    }
  },
  data() {
    return {
      selectTreeData: []
    };
  },
  watch: {
    selectTreeData(val) {
      this.$emit("logSelectData", val);
    }
  },
  methods: {
    updateSelectTreeData() {
      return this.selectTreeData;
    },
    resetSelectTreeData() {
      console.log(333333333)
      this.selectTreeData = [];
    },
    handleCheckbox(val, currentItem, parentVal) {
      let paArr = [...arguments].slice(2);

      if (val) {
        this.selectTreeData = this.arrPushUnRepeatedFunc(
          this.selectTreeData,
          paArr
        );
        this.recursionAddCheckboxChildFunc(currentItem.children);
      } else {
        this.recursionDeleteCheckboxChildFunc(currentItem.children);
      }
    },
    handleCheckbox2(val, currentItem, rootArr) {
      let paId = currentItem.parentId;
      let cuId = currentItem.permissionId;

      if (val) {
        this.recursionAddCheckboxChildFunc(currentItem.children);
      } else {
        this.recursionDeleteCheckboxChildFunc(currentItem.children);
      }

      let arr = this.recursionAddCheckboxParentFunc(rootArr, paId);

      this.selectTreeData.push(...arr);
      this.selectTreeData = this.unRepeatedFunc(this.selectTreeData);
    },
    recursionAddCheckboxParentFunc(data, id) {
      for (var i in data) {
        if (data[i].permissionId == id) {
          return [data[i].permissionId];
        }
        if (data[i].children) {
          var ro = this.recursionAddCheckboxParentFunc(data[i].children, id);
          if (ro !== undefined) {
            return ro.concat(data[i].permissionId);
          }
        }
      }
    },
    recursionAddCheckboxChildFunc(chData) {
      if (Object.prototype.toString.call(chData) == "[object Array]") {
        chData.forEach(item => {
          this.selectTreeData = this.arrPushUnRepeatedFunc(
            this.selectTreeData,
            item.permissionId
          );
          this.recursionAddCheckboxChildFunc(item.children);
        });
      } else {
        return;
      }
    },
    recursionDeleteCheckboxChildFunc(chData) {
      if (Object.prototype.toString.call(chData) == "[object Array]") {
        chData.forEach(item => {
          this.deleteArrEleFunc(this.selectTreeData, item.permissionId);
          this.recursionDeleteCheckboxChildFunc(item.children);
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
    }
  }
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
