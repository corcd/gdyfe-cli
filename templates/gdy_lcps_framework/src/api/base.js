/**
 * @file common request api
 * @since 1.0.0
 * @author whzcorcd <whzcorcd@gmail.com>
 */

const base = {
  gateWay:
    process.env.VUE_APP_RUN_ENV === 'development'
      ? '//consoleapi.guangdianyun.tv'
      : '//consoleapi.guangdianyun.tv'
}

export default base
