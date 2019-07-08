<template>
  <div>
    <label v-if="label">{{label}}</label>
    <div>
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Emitter from '../../mixins/emitter'

export default {
  name: 'iFormItem',
  mixins: [Emitter],
  props: {
    label: {
      type: String,   // 表单名称
      default: ''
    },
    prop: {
      type: String    // 表单对应数据对象的key值
    }
  },
  // 组件渲染时，将实例缓存在 Form 中
  mounted() {
    // 如果没有传入prop，则无需校验，也就无需缓存
    if (this.prop) {
      this.dispatch('iForm', 'on-form-item-add', this)
    }
  },
  // 实例销毁前，将实例从 Form 的缓存中移除
  beforeDestory() {
    this.dispatch('iForm', 'on-form-item-remove', this)
  }
}
</script>
<style lang="less" scoped>
</style>

