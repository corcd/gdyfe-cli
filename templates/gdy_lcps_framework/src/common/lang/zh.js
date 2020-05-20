module.exports = {
  message: {
    pages: {
      loading: {
        normalWaitingText: '延迟导播台启动中，请勿关闭或刷新页面，进度',
        advancedWaitingText:
          '延迟导播台创建可能需要更多的时间，请勿关闭或刷新页面，进度'
      },
      error: {
        reload: '重新载入延迟导播台',
        closePage: '关闭页面',
        error: '导播台错误',
        error_info:
          '请尝试关闭页面后重新进入，如继续遇到问题请联系相应的商务经理',
        error_login: '导播台登陆验证失败',
        error_login_info:
          '当前用户登陆验证失败，请检查登录状态后重新进入，如继续遇到问题请联系相应的商务经理',
        error_closed: '导播台已关闭',
        error_closed_info:
          '当前导播台已经过期或者被关闭，如需使用请重新开启，如继续遇到问题请联系相应的商务经理',
        error_destroyed: '导播台已销毁',
        error_destroyed_info:
          '当前导播台已被销毁，如需使用请重新创建，如继续遇到问题请联系相应的商务经理',
        error_inexistent: '导播台不存在',
        error_inexistent_info:
          '当前导播台不存在，请确认 AppId 是否正确，如继续遇到问题请联系相应的商务经理',
        error_arguments: '导播台参数错误',
        error_arguments_info:
          '当前导播台参数错误，请确认地址正确后重新进入，如继续遇到问题请联系相应的商务经理',
        error_runtime: '导播台服务超时',
        error_runtime_info:
          '当前导播台访问后台服务超时，请稍后重新进入，如继续遇到问题请联系相应的商务经理'
      },
      home: {
        Navbar: {
          title: '获取中...',
          cpu: 'CPU 占用：',
          net: '网络：',
          remainingTime: '剩余时间：',
          postpone: '延期',
          language: '语言设置',
          fullScreen: '全屏/退出全屏'
        },
        Player: {
          mssList: {
            resolution: '解析度：',
            originalResolution: '原解析度',
            volume: '文件大小：',
            createdTime: '创建时间：',
            transcoding: '媒资自动转码中...'
          },
          playerMask: {
            1: '您的浏览器',
            2: '不支持',
            3: '视频',
            4: '自动',
            5: '播放',
            flash: '您需要安装 Adobe Flash Player 11.1.0 以上的版本.',
            obtain: '点击获取'
          },
          loading: '播放器载入中',
          policy: '了解详情',
          start: '开始播放',
          noDelaySource: '无延时源',
          delaySource: '延时源',
          display: '播出画面',
          gasket: '垫片',
          delayDuration: '延时时间',
          intervalOfTime: '可设置为 10 ~ 300 秒',
          save: '保存设置',
          switchToOriginal: '切换原片',
          switchToGasket: '切换垫片',
          setting: '垫片设置',
          mssSource: '媒资素材',
          search: '搜索：',
          userUploads: '用户上传',
          cloudMadeStorage: '云制作存储',
          imageSource: '图片素材',
          images: '图片：',
          upload: '上传图片',
          uploadTips: '建议上传 1920*1080 的 JPG 格式图片'
        },
        Refresh: {
          networkError: '网络发生中断，请检查网络',
          refresh: '刷新'
        }
      }
    },
    request: {
      400: '请求错误，请检查您的网络',
      404: '请求的资源不存在',
      450: '请求参数错误',
      500: '服务异常，请稍后再试',
      503: '服务不可用，请稍后再试',
      fail: '请求失败',
      error: '请求响应错误',
      unexpected: '请求响应异常',
      natworkError: '网络断开',
      unknown: '未知错误'
    },
    model: {
      title: '操作提示',
      cancel: '取消',
      confirm: '确定',
      tips: {
        dataType: '数据格式错误',
        version:
          '当前浏览器版本过低，导播台功能可能受限，升级浏览器至新版本以获得最佳的体验',
        browser: '推荐使用 Chrome 浏览器以获得更好的性能和体验',
        loadFailed: '播放器加载失败',
        notSupported: '不支持 H5 Player',
        tooManyPages: '系统默认同时最多打开2个页面',
        delayTips: '修改延迟时间会有预计 10 秒左右的画面卡顿，是否继续?',
        imgType: '上传图片只能是 JPG/PNG/GIF 格式',
        imgVolume: '上传图片大小不能超过 2MB',
        transcoding: '媒资对象正在自动转码中，暂不可选',
        notAllowedMss: '非法的媒资对象'
      }
    }
  }
}
