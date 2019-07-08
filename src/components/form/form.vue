<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: 'iForm',
  props: {
    model: {
      type: Object    // 表单数据对象
    },
    rules: {
      type: Object    // 表单验证规则
    }
  },
  created() {
    this.$on('on-form-item-add', (field) => {
      if (field) this.fields.push(field)
    })
    this.$on('on-form-item-remove', (field) => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1)
    })
  }
}
</script>
<style lang="less" scoped>
</style>

