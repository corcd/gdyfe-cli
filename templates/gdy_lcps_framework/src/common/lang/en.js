module.exports = {
  message: {
    pages: {
      loading: {
        normalWaitingText:
          'During the start of the guide, please do not close or refresh the page, progress',
        advancedWaitingText:
          'Delayed guide creation may take more time, please do not close or refresh the page, progress'
      },
      error: {
        reload: 'Reload Delayed Director',
        closePage: 'Close the page',
        error: 'Director error',
        error_info:
          'Please try to close the page and re-enter. If you continue to encounter problems, please contact the corresponding business manager',
        error_login: 'Boot station login verification failed',
        error_login_info:
          'The current user login verification failed, please check the login status and re-enter. If you continue to encounter problems, please contact the corresponding business manager',
        error_closed: 'Director closed',
        error_closed_info:
          'The current broadcaster has expired or been closed. If you need to use it, please reopen it. If you continue to encounter problems, please contact the corresponding business manager',
        error_destroyed: 'Director has been destroyed',
        error_destroyed_info:
          'The current broadcasting station has been destroyed. If you need to use it, please re-create it. If you continue to encounter problems, please contact the corresponding business manager',
        error_inexistent: 'Director does not exist',
        error_inexistent_info:
          'The current director does not exist, please confirm whether the AppId is correct, if you continue to encounter problems, please contact the corresponding business manager',
        error_arguments: 'Bad station parameters',
        error_arguments_info:
          'The parameters of the current director are wrong, please confirm the address and re-enter. If you continue to encounter problems, please contact the corresponding business manager',
        error_runtime: 'Director service timed out',
        error_runtime_info:
          'The current background station access to the background service timed out, please re-enter later, if you continue to encounter problems, please contact the corresponding business manager'
      },
      home: {
        Navbar: {
          title: 'Getting ...',
          cpu: 'CPU: ',
          net: 'Network: ',
          remainingTime: 'Remaining time: ',
          postpone: 'postpone',
          language: 'Language',
          fullScreen: 'Full Screen / Exit Full Screen'
        },
        Player: {
          mssList: {
            resolution: 'Resolution: ',
            originalResolution: 'Original',
            volume: 'Size: ',
            createdTime: 'Time: ',
            transcoding: 'Automatic media transcoding ...'
          },
          playerMask: {
            1: 'Your Browser',
            2: 'Not supported',
            3: 'Video',
            4: 'Auto',
            5: 'Play',
            flash: 'You need Adobe Flash Player 11.1.0 or higher.',
            obtain: 'click to obtain'
          },
          loading: 'Player is loading',
          policy: 'Learn more',
          start: 'Start playing',
          noDelaySource: 'No Delay Source',
          delaySource: 'Delay Source',
          display: 'Broadcast Picture',
          gasket: 'Gasket',
          delayDuration: 'Duration',
          intervalOfTime: 'Can be set to 10s ~ 300s',
          save: 'Save',
          switchToOriginal: 'Switch original',
          switchToGasket: 'Switch gasket',
          setting: 'Shim Settings',
          mssSource: 'Media Resources',
          search: 'Search',
          userUploads: 'User Uploads',
          cloudMadeStorage: 'Cloud Made Storage',
          imageSource: 'Image Source',
          images: 'Picture',
          upload: 'Upload Image',
          uploadTips: '1920 * 1080 JPEG picture is BEST'
        },
        Refresh: {
          networkError: 'Network Error',
          refresh: 'Refresh'
        }
      }
    },
    request: {
      400: 'Request error, please check your network',
      404: 'The requested resource does not exist',
      450: 'Request parameter error',
      500: 'Service exception, please try again later',
      503: 'Service is unavailable, please try again later',
      fail: 'Request failed',
      error: 'Request response error',
      unexpected: 'Request response exception',
      natworkError: 'Network disconnected',
      unknown: 'Unknown error'
    },
    model: {
      title: 'Operation Tips',
      cancel: 'Cancel',
      confirm: 'OK',
      tips: {
        dataType: 'Data format error',
        version:
          'The current browser version is too low, the guide function may be limited. Upgrade your browser to the new version for the best experience',
        browser:
          'Recommended Chrome browser for better performance and experience',
        loadFailed: 'Player failed to load',
        notSupported: 'H5 Player is not supported',
        tooManyPages:
          'The system opens up to 2 pages at the same time by default',
        delayTips:
          'There will be a screen freeze of about 10 seconds when you modify the delay time. Do you want to continue?',
        imgType: 'Upload pictures can only be in JPG / PNG / GIF format',
        imgVolume: 'Upload image size cannot exceed 2MB',
        transcoding:
          'The media asset object is being automatically transcoded, it is not optional at this time',
        notAllowedMss: 'Illegal media asset object'
      }
    }
  }
}
