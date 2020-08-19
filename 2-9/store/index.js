export const actions = {
  /**
   * 该action只能出现在index中，且只能在服务端执行一次
   * 参数2是nuxt上下文
   */
  nuxtServerInit({commit}, {app}) {
    // 1、获取cookie，安装npm i cookie-universal-nuxt -S
    // 配置nuxt.config.js modules: ['cookie-universal-nuxt']
    const token = app.$cookie.get('token')
    // 2、写入user模块中
    if (token) {
      commit('user/init', token)
    }
  }
}