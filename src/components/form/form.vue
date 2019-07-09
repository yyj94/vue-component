<template>
  <form>
    <slot></slot>
  </form>
</template>
<script>
export default {
  name: 'iForm',
  provide() {
    return {
      form: this
    }
  },
  props: {
    model: {
      type: Object    // 表单数据对象
    },
    rules: {
      type: Object    // 表单验证规则
    }
  },
  data() {
    return {
      fields: []
    }
  },
  created() {
    this.$on('on-form-item-add', (field) => {
      if (field) this.fields.push(field)
    })
    this.$on('on-form-item-remove', (field) => {
      if (field.prop) this.fields.splice(this.fields.indexOf(field), 1)
    })
  },
  methods: {
    // 公开方法：全部重置数据
    resetFields() {
      this.fields.forEach(field => {
        field.resetFields();
      })
    },
    // 公开方法：全部校验数据，支持 Promise
    validate(callback) {
      return new Promise(resolve => {
        let valid = true
        let count = 0
        this.fields.forEach(field => {
          field.validate('', errors => {
            if (errors) {
              valid = false
            }
            if (++count === this.fields.length) {
              // 全部完成
              resolve(valid)
              if (typeof callback === 'function') {
                callback(valid)
              }
            }
          })
        })
      })
    },
  }
}
</script>
<style lang="less" scoped>
</style>

