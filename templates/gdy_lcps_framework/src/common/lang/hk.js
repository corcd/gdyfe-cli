module.exports = {
  message: {
    pages: {
      loading: {
        normalWaitingText: '延遲導播台啟動中，請勿離開或重載頁面，進度',
        advancedWaitingText:
          '延遲導播台創建可能需要更多的時間，請勿離開或重載頁面，進度'
      },
      error: {
        reload: '重新載入延遲導播台',
        closePage: '離開頁面',
        error: '導播台錯誤',
        error_info:
          '請嘗試離開頁面後重新進入，如繼續遇到問題請聯繫相應的商務經理',
        error_login: '導播台登陸驗證失敗',
        error_login_info:
          '當前用戶登陸驗證失敗，請檢查登錄狀態後重新進入，如繼續遇到問題請聯繫相應的商務經理',
        error_closed: '導播台已離開',
        error_closed_info:
          '當前導播台已經過期或者被離開，如需使用請重新開啟，如繼續遇到問題請聯繫相應的商務經理',
        error_destroyed: '導播台已銷毀',
        error_destroyed_info:
          '當前導播台已被銷毀，如需使用請重新創建，如繼續遇到問題請聯繫相應的商務經理',
        error_inexistent: '導播台不存在',
        error_inexistent_info:
          '當前導播台不存在，請確認 AppId 是否正確，如繼續遇到問題請聯繫相應的商務經理',
        error_arguments: '導播台引數錯誤',
        error_arguments_info:
          '當前導播台引數錯誤，請確認地址正確後重新進入，如繼續遇到問題請聯繫相應的商務經理',
        error_runtime: '導播台服務超時',
        error_runtime_info:
          '當前導播台訪問後台服務超時，請稍後重新進入，如繼續遇到問題請聯繫相應的商務經理'
      },
      home: {
        Navbar: {
          title: '獲取中...',
          cpu: 'CPU 佔用：',
          net: '網路：',
          remainingTime: '剩餘時間：',
          postpone: '延期',
          language: '語言設定',
          fullScreen: '全熒幕/退出全熒幕'
        },
        Player: {
          mssList: {
            resolution: '分辨率：',
            originalResolution: '原分辨率',
            volume: '文件大小：',
            createdTime: '創建時間：',
            transcoding: '媒資自動轉碼中...'
          },
          playerMask: {
            1: '您的瀏覽器',
            2: '不支持',
            3: '視頻',
            4: '自動',
            5: '播放',
            flash: '您需要安裝 Adobe Flash Player 11.1.0 以上的版本.',
            obtain: '點擊獲取'
          },
          loading: '播放器載入中',
          policy: '了解詳情',
          start: '開始播放',
          noDelaySource: '無延時源',
          delaySource: '延時源',
          display: '播出畫面',
          gasket: '墊片',
          delayDuration: '延時時間',
          intervalOfTime: '可設定為 10 ~ 300 秒',
          save: '保存設定',
          switchToOriginal: '切換原片',
          switchToGasket: '切換墊片',
          setting: '墊片設定',
          mssSource: '媒資素材',
          search: '搜索：',
          userUploads: '用戶上傳',
          cloudMadeStorage: '雲製作存儲',
          imageSource: '圖片素材',
          images: '圖片：',
          upload: '上傳圖片',
          uploadTips: '建議上傳 1920*1080 的 JPG 格式圖片'
        },
        Refresh: {
          networkError: '網路發生中斷，請檢查網路',
          refresh: '重載'
        }
      }
    },
    request: {
      400: '請求錯誤，請檢查您的網路',
      404: '請求的資源不存在',
      450: '請求引數錯誤',
      500: '服務異常，請稍後再試',
      503: '服務不可用，請稍後再試',
      fail: '請求失敗',
      error: '請求響應錯誤',
      unexpected: '請求響應異常',
      natworkError: '網路斷開',
      unknown: '未知錯誤'
    },
    model: {
      title: '操作提示',
      cancel: '取消',
      confirm: '確定',
      tips: {
        dataType: '數據格式錯誤',
        version:
          '當前瀏覽器版本過低，導播台功能可能受限，升級瀏覽器至新版本以獲得最佳的體驗',
        browser: '推薦使用 Chrome 瀏覽器以獲得更好的性能和體驗',
        loadFailed: '播放器加載失敗',
        notSupported: '不支持 H5 Player',
        tooManyPages: '系統默認同時最多打開2個頁面',
        delayTips: '修改延遲時間會有預計 10 秒左右的畫面卡頓，是否繼續?',
        imgType: '上傳圖片只能是 JPG/PNG/GIF 格式',
        imgVolume: '上傳圖片大小不能超過 2MB',
        transcoding: '媒資對象正在自動轉碼中，暫不可選',
        notAllowedMss: '非法的媒資對象'
      }
    }
  }
}
