<template>
  <div class="home">
    <i-form :model="formValidate" :rules="ruleValidate">
      <i-form-item label="用户名" prop="name">
        <i-input v-model="formValidate.name"></i-input>
      </i-form-item>
      <i-form-item label="邮箱" prop="email">
        <i-input v-model="formValidate.email"></i-input>
      </i-form-item>
    </i-form>
  </div>
</template>

<script>
// @ is an alias to /src
import iForm from '@/components/form/form.vue'
import iFormItem from '@/components/form/form-item.vue'
import iInput from '@/components/input/input.vue'

export default {
  name: 'home',
  components: {
    iForm,
    iFormItem,
    iInput
  },
  data() {
    return {
      formValidate: {     // 表单数据对象
        name: '',
        email: ''
      },
      ruleValidate: {    // 表单验证规则
        name: [
          { required: true, message: '用户名不能为空', trigger: 'blur' }
        ],
        email: [
          { required: true, message: '邮箱格式不正确', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
