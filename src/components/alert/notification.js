import Alert from './alert.vue'
import Vue from 'vue'

// webpack 的 vue-loader 会将 .vue 文件中的 template 编译为 Render 函数，最终就会成为一个 JS 对象
Alert.newInstance = properties => {
    const props = properties || {} // 增加拓展性

    const Instance = new Vue({
        data: props,
        render(h) {
            return h(Alert, {
                props: props
            })
        }
    })

    const component = Instance.$mount();
    document.body.appendChild(component.$el)

    const alert = Instance.$children[0] // Alert组件实例

    return {
        add(noticeProps) {
            alert.add(noticeProps)
        },
        remove(name) {
            alert.remove(name)
        }
    }
}

export default Alert