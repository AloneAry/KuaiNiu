<template>
  <div class="loginContainer">
    <div class="loginInner">
      <div class="login_header">
        <h2 class="login_logo">硅谷配送</h2>
        <div class="login_header_title">
          <a
            href="javascript:;"
            :class="{ on: loginWay }"
            @click="loginWay = true"
            >短信登录</a
          >
          <a
            href="javascript:;"
            :class="{ on: !loginWay }"
            @click="loginWay = false"
            >密码登录</a
          >
        </div>
      </div>
      <div class="login_content">
        <form @submit.prevent="login">
          <div :class="{ on: loginWay }">
            <section class="login_message">
              <input
                type="tel"
                maxlength="11"
                placeholder="手机号"
                v-model="phone"
              />
              <button
                :disabled="!rightPhone"
                class="get_verification"
                :class="{ test_phone: rightPhone }"
                @click.prevent="getCode"
              >
                {{
                  computedTime > 0 ? `已发送(${computedTime}s)` : "获取验证码"
                }}
              </button>
            </section>
            <section class="login_verification">
              <input
                type="text"
                maxlength="6"
                placeholder="验证码"
                v-model="code"
              />
            </section>
            <section class="login_hint">
              温馨提示：未注册硅谷外卖账号的手机号，登录时将自动注册，且代表已同意
              <a href="javascript:;">《用户服务协议》</a>
            </section>
          </div>
          <div :class="{ on: !loginWay }">
            <section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="手机号/邮箱/用户名"
                  v-model="name"
                />
              </section>
              <section class="login_verification">
                <input
                  type="text"
                  maxlength="8"
                  placeholder="密码"
                  v-if="showPwd"
                  v-model="pwd"
                />
                <input
                  type="password"
                  maxlength="8"
                  placeholder="密码"
                  v-else
                  v-model="pwd"
                />
                <div
                  class="switch_button"
                  :class="{ on: showPwd }"
                  @click="showPwd = !showPwd"
                >
                  <div class="switch_circle" :class="{ right: showPwd }"></div>
                  <span class="switch_text">{{ showPwd ? "abc" : "..." }}</span>
                </div>
              </section>
              <section class="login_message">
                <input
                  type="text"
                  maxlength="11"
                  placeholder="验证码"
                  v-model="captcha"
                />
                <img
                  class="get_verification"
                  src="http://localhost:4000/captcha"
                  alt="captcha"
                  @click="getCapcha"
                />
              </section>
            </section>
          </div>
          <button class="login_submit">登录</button>
        </form>
        <a href="javascript:;" class="about_us">关于我们</a>
      </div>
      <span href="javascript:;" class="go_back" @click="$router.back(-1)">
        <i class="iconfont icon-jiantouzuo"></i>
      </span>
    </div>
    <AlertTip
      :alertText="alertText"
      v-show="showAlert"
      @closeTip="closeTip"
    ></AlertTip>
  </div>
</template>

<script>
import AlertTip from "../../components/AlertTip/AlertTip.vue";
import {reqPwdLogin, reqSendCode, reqSmsLogin} from "../../api"
export default {
  data() {
    return {
      loginWay: true, //true短信登录，flase验证码登录
      phone: "", //手机号
      computedTime: 0, //计时的时间
      showPwd: false, //选择是否显示密码
      name: "", //用户名验证
      pwd: "", //密码验证
      right: "",
      code: "", //短信验证码
      captcha: "", //图像验证码
      alertText: "", //提示文本
      showAlert: false, // 是否显示警告框
    };
  },

  computed: {
    rightPhone() {
      return /^1\d{10}$/.test(this.phone);
    },
  },

  methods: {
    // 异步获取短信验证码
    async getCode() {

      if (!this.computedTime) {
      this.computedTime = 30;
      // 创建定时器
      const intervalId = setInterval(() => {
        // 如果计时器大于零进行倒计时
        // 启动循环定时器，每隔1s减少1
        if (this.computedTime <= 0) {
          clearInterval(intervalId);
        }
        this.computedTime--;

        // 如果到时，停止倒计时
        if (this.computedTime===0) {
          clearInterval(this.intervalId)
        }
      }, 1000);
      // 发送ajax请求（请求后台指向指定手机号发验证码短信）
      // 发送短信验证码
      let result = await reqSendCode(this.phone)
      if(result.code === 1) {
        // 显示提示框
        this.showAlert = true
        this.alertText = result.msg
        // 停止倒计时
        if(this.computedTime) {
          this.computedTime=0
          clearInterval(this.intervalId)
        }
      }
    }
  },

    showAlerts(alertText) {
      this.showAlert = true;
      this.alertText = alertText;
    },
    // 异步登录
    login() {
      // 前台表单验证
      if (this.loginWay) {
        // 短信登录
        const { rightPhone, phone, code } = this;
        // 验证手机号格式是否正确
        if (!this.rightPhone) {
          // alert('手机号格式不正确')
          this.showAlerts("手机号格式不正确");
        } else if (!/^\d{6}$/.test(code)) {
          // 验证码必须为6位数字
          this.showAlerts("验证码不正确");
        }
      } else {
        // 密码登录
        const { name, pwd, capcha } = this;
        if (!this.name) {
          // 用户必须指定
          this.showAlerts("用户必须指定");
        } else if (!this.pwd) {
          // 密码必须指定
          this.showAlerts("密码必须指定");
        } else if (!this.capcha) {
          // 验证码必须指定
          this.showAlerts("验证码不正确");
        }
      }
    },

    closeTip() {
      this.showAlert = false;
      this.alertText = "";
    },

    getCapcha(event) {
      // 每次指定的src值要不同
      event.target.src = "http://localhost:4000/captcha?time="+Date.now()
    }
  },

  components: {
    AlertTip,
  },
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
@import '../../common/stylus/mixins.styl';

.loginContainer {
  width: 100%;
  height: 100%;
  background: #fff;

  .loginInner {
    padding-top: 60px;
    width: 80%;
    margin: 0 auto;

    .login_header {
      .login_logo {
        font-size: 40px;
        font-weight: bold;
        color: #02a774;
        text-align: center;
      }

      .login_header_title {
        padding-top: 40px;
        text-align: center;

        >a {
          color: #333;
          font-size: 14px;
          padding-bottom: 4px;

          &:first-child {
            margin-right: 40px;
          }

          &.on {
            color: #02a774;
            font-weight: 700;
            border-bottom: 2px solid #02a774;
          }
        }
      }
    }

    .login_content {
      >form {
        >div {
          display: none;

          &.on {
            display: block;
          }

          input {
            width: 100%;
            height: 100%;
            padding-left: 10px;
            box-sizing: border-box;
            border: 1px solid #ddd;
            border-radius: 4px;
            outline: 0;
            font: 400 14px Arial;

            &:focus {
              border: 1px solid #02a774;
            }
          }

          .login_message {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .get_verification {
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);
              border: 0;
              color: #ccc;
              font-size: 14px;
              background: transparent;

              &.test_phone {
                color: black;
              }
            }
          }

          .login_verification {
            position: relative;
            margin-top: 16px;
            height: 48px;
            font-size: 14px;
            background: #fff;

            .switch_button {
              font-size: 12px;
              border: 1px solid #ddd;
              border-radius: 8px;
              transition: background-color 0.3s, border-color 0.3s;
              padding: 0 6px;
              width: 30px;
              height: 16px;
              line-height: 16px;
              color: #fff;
              position: absolute;
              top: 50%;
              right: 10px;
              transform: translateY(-50%);

              &.off {
                background: #fff;

                .switch_text {
                  float: right;
                  color: #fff;
                }
              }

              &.on {
                background: #02a774;
              }

              >.switch_circle {
                // transform translateX(27px)
                position: absolute;
                top: -1px;
                left: -1px;
                width: 16px;
                height: 16px;
                border: 1px solid #ddd;
                border-radius: 50%;
                background: #fff;
                box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.1);
                transition: transform 0.3s;
              }

              .right {
                transform: translateX(30px);
              }
            }
          }

          .login_hint {
            margin-top: 12px;
            color: #999;
            font-size: 14px;
            line-height: 20px;

            >a {
              color: #02a774;
            }
          }
        }

        .login_submit {
          display: block;
          width: 100%;
          height: 42px;
          margin-top: 30px;
          border-radius: 4px;
          background: #4cd96f;
          color: #fff;
          text-align: center;
          font-size: 16px;
          line-height: 42px;
          border: 0;
        }
      }

      .about_us {
        display: block;
        font-size: 12px;
        margin-top: 20px;
        text-align: center;
        color: #999;
      }
    }

    .go_back {
      position: absolute;
      top: 5px;
      left: 5px;
      width: 30px;
      height: 30px;

      >.iconfont {
        font-size: 20px;
        color: #999;
      }
    }
  }
}
</style>