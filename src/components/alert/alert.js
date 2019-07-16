import Notification from './notification'

let messageInstance

function getMessageInstance() {
    messageInstance = messageInstance || Notification.newInstance() // 旨在第一次调用 Notification 的 newInstance 时来创建实例
    return messageInstance
}

function notice({
    duration = 1.5,
    content = ''
}) {
    let instance = getMessageInstance();

    instance.add({
        content: content,
        duration: duration
    })
}

export default {
    // 提供不同显示效果
    info(options) {
        return notice(options)
    }
}