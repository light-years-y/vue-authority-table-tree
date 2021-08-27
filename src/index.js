import tableTree from './tableTree.vue'
import { Button, Select, Checkbox, CheckboxGroup, Row, Col, Form } from 'element-ui';
// import ElementUI from 'element-ui'
import _Vue from 'vue'

tableTree.install = function (Vue) {
  if (!Vue) {
    window.Vue = Vue = _Vue
  }
  // Vue.use(ElementUI)
  Vue.component(tableTree.name, tableTree);
  Vue.use(Button)
  Vue.use(Select)
  Vue.use(Checkbox)
  Vue.use(CheckboxGroup)
  Vue.use(Row)
  Vue.use(Col)
  Vue.use(Form)
};

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(tableTree)
}

// 导出组件库
export default tableTree