<template>
  <div ref="display"></div>
</template>
<script>
import randomStr from '../../utils/random_str'
export default {
  props: {
    code: {
      type: String,
      default: ''
    },

  },
  data() {
    return {
      html: '',
      js: '',
      css: '',
      component: null,
      id: randomStr(),
    }
  },
  watch: {
    code() {
      this.destroyCode();
      this.renderCode();
    }
  },
  mounted() {
    this.renderCode()
  },
  beforeDestroy() {
    this.destroyCode()
  },
  methods: {
    // 截取特定标签的正则函数
    getSource(source, type) {
      const regex = new RegExp(`<${type}[^>]*>`);
      let openingTag = source.match(regex);

      if (!openingTag) return '';
      else openingTag = openingTag[0];

      return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`));
    },
    // 从字符串中分解出 script、style、template
    splitCode() {
      const script = this.getSource(this.code, 'script').replace(/export default/, 'return ');
      const style = this.getSource(this.code, 'style');
      const template = '<div id="app">' + this.getSource(this.code, 'template') + '</div>';

      this.js = script;
      this.css = style;
      this.html = template;
    },
    // 分解code并进行渲染
    renderCode() {
      this.splitCode();

      if (this.html !== '' && this.js !== '') {
        const parseStrToFuc = new Function(this.js)()   //  将 字符串 转换为 对象

        parseStrToFuc.template = this.html
        const Component = Vue.extend(parseStrToFuc)
        this.component = new Component().$mount();

        this.$refs.display.appendChild(this.component.$el)

        if (this.css !== '') {
          const style = document.createElement('style')
          style.type = 'text/css'
          style.id = this.id
          style.innerHTML = this.css
          document.getElementsByTagName('head')[0].appendChild(style)
        }
      }
    },
    // 组件销毁前手动销毁extend的实例和手动插入的css
    destroyCode() {
      // 移除style标签
      const $target = document.getElementById(this.id);
      if ($target) $target.parentNode.removeChild($target);
      //销毁extend的实例
      if (this.component) {
        this.$refs.display.removeChild(this.component.$el);
        this.component.$destroy();
        this.component = null;
      }
    }
  }
}
</script>
<style lang="less" scoped>
</style>


