<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <!-- /导航栏 -->
    <div class="bg"></div>
    <div class="bg2"></div>
    <div class="tips">
      <div class="title">知享园</div>
      <div class="subtitle">知识技术分享平台~</div>
    </div>
    <!-- 登录表单 -->
    <van-form @submit="onSubmit" class="login-form" ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
        type="number"
        maxlength="11"
        class="form_input"
      >
        <!-- 通过插槽处理自定义图标 -->
        <Icon slot="left-icon" type="doc-shouji"/>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
        type="number"
        maxlength="6"
        class="form_input"
      >
        <Icon slot="left-icon" type="doc-yanzhengma"/><!-- 通过插槽处理自定义图标 -->
        <template #button><!-- 新版本插槽的写法 -->
          <van-count-down
            v-if="isCountDownShow"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
           v-else
           class="send-sms-btn"
           native-type="button"
           round
           size="small"
           type="default"
           @click="onSendSms">发送验证码</van-button>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button class="login-btn" block type="info" native-type="submit">
          登录
        </van-button>
      </div>
    </van-form>
    <!-- /登录表单 -->
  </div>
</template>

<script>
import Icon from '@/components/Icon'
import { lodToast, sucToast, failToast } from '@/utils/msgTips.js'
import { login, sendSms } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  components: {
    Icon
  },
  props: {},
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      },
      userFormRules: {
        mobile: [{
          required: true,
          message: '手机号不能为空'
        }, {
          pattern: /^1[3|5|7|8]\d{9}$/,
          message: '手机号格式错误'
        }],
        code: [{
          required: true,
          message: '验证码不能为空'
        }, {
          pattern: /^\d{6}$/,
          message: '验证码格式错误'
        }]
      },
      isCountDownShow: false
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async onSubmit (values) {
      lodToast('登录中...')
      try {
        const { data } = await login(this.user)
        this.$store.commit('setUser', data.data)
        sucToast('登录成功')
        this.$router.push('/')
      } catch (err) {
        if (err.response.status === 400) {
          failToast('手机号或验证码错误')
        } else {
          failToast('登录失败，请稍后重试')
        }
      }
    },
    async onSendSms () {
      // 1. 校验手机号
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }
      // 2. 验证通过，显示倒计时
      this.isCountDownShow = true
      // 3. 请求发送验证码
      try {
        await sendSms(this.user.mobile)
        sucToast('发送成功')
      } catch (err) {
        // 发送失败，关闭倒计时
        this.isCountDownShow = false
        if (err.response.status === 429) {
          failToast('发送太频繁了，请稍后重试')
        } else {
          failToast('发送失败，请稍后重试')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.login-container {
    .bg {
        position: fixed;
        top: -250px;
        right: -250px;
        width: 600px;
        height: 600px;
        border-radius: 100%;
        background-color: #00baef;
        z-index: -1;
    }
    .bg2 {
        position: fixed;
        top: -150px;
        right: -300px;
        width: 600px;
        height: 600px;
        border-radius: 100%;
        background-color: #ade8f9;
        z-index: -2;
    }
    .tips {
        padding-top: 200px;
        padding-left: 80px;
        display: flex;
        flex-direction: column;

        .title {
            line-height: 70px;
            font-weight: bold;
            font-size: 50px;
        }

        .subtitle {
            line-height: 70px;
            font-size: 35px;
            font-weight: bold;
            color: #b0b0b1;
        }

    }
  .login-form{
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 30px;
    border-radius: 40px;
    margin-top: 100px;
    .form_input{
        width: 600px;
        border-radius: 40px;
        margin-top: 20px;
        height: 90px;
    }
  }
  .send-sms-btn {
    width: 170px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }

  .login-btn-wrap {
    padding: 53px 33px;
    .login-btn {
        width: 600px;
        border: none;
        height: 90px;
        border-radius: 100px;
        color: #FFFFFF;
        background: linear-gradient(to right, #00c6fc, #9adcf1);
    }
  }
}
</style>
