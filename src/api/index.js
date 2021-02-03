/**
 * 与后台交互模块
 * */ 
import ajax from './ajax'

const BASE_URL = '/api'
/**
 * 获取地址信息（根据经纬度）
 */
export const reqAddress = (geohash) => ajax(`${BASE_URL}/position/${geohash}`)

/**
 * 获取msite页面食品分类列表
 */
export const reqCategorys = () => ajax(`${BASE_URL}/index_category`)

/**
 * 获取msite商铺列表（根据经纬度）
 */
export const reqShops = ({latitude, longitude}) => ajax('/api/shops', {latitude, longitude})

/**
 *账号密码登录 
 */ 
export const reqPwdLogin = ({name, pwd, captcha}) => ajax(BASE_URL+'/login_pwd',{
  name,
  pwd,
  captcha
},'POST')

/**
 *获取短信验证码
 */ 
export const reqSendCode = (phone, code) => (BASE_URL+'/login_sms',{phone, code},"POST")

/**
 *手机号验证码登录 
 */
export const reqSmsLogin = (phone,code) => ajax(BASE_URL+'/login_sms',{phone, code},'POST')

/**
 *获取用户信息 
 */ 
 export const reqUserInfo = () => ajax('/api/userinfo')


/**
 * 请求登出
 */ 
export const reqLogout = () => ajax('/api/logout')





