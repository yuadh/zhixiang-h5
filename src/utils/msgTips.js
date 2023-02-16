import { Toast } from 'vant'

export function lodToast (msg = '加载中..') {
  Toast.loading({
    duration: 4000,
    message: msg,
    forbidClick: true // 是否禁止背景点击
  })
}

export function defToast (msg = '提示信息') {
  Toast({
    duration: 1000,
    message: msg,
    forbidClick: true // 是否禁止背景点击
  })
}

export function sucToast (msg = '操作成功') {
  Toast.success({
    duration: 1000,
    message: msg,
    forbidClick: true // 是否禁止背景点击
  })
}

export function failToast (msg = '操作失败') {
  Toast.fail({
    duration: 1000,
    message: msg,
    forbidClick: true // 是否禁止背景点击
  })
}

export function clearToast () {
  Toast.clear()
}
