<template>
  <div>
    <div class="header">
      <div class="bg">
        <div class="box">
          <div class="box-hd">
            <div class="avator">
              <img class="avatar" :src="userInfo.photo"/>
            </div>
            <div class="phone-number">{{userInfo.intro||'知享园用户'}}</div>
            <div class="box-bd">
              <div class="item">
                <span>{{ userInfo.art_count }}</span>
                <div class="text">文章</div>
              </div>
              <div class="item">
                <span>{{ userInfo.follow_count }}</span>
                <div class="text">关注</div>
              </div>
              <div class="item">
                <span>{{ userInfo.fans_count }}</span>
                <div class="text">粉丝</div>
              </div>
              <div class="item">
                <span>{{ userInfo.like_count }}</span>
                <div class="text">点赞</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="top"></div>
    <div class="list-content">
      <div class="list">
      </div>
      <div class="list">

        <div class="li ">
          <div class="icon">
            <img src="../../assets/icons/help.png"/>
          </div>
          <div class="text">我的收藏</div>
          <img class="to" src="../../assets/icons/to.png"/>
        </div>
        <div class="li" @click="$router.push('/user/update')">
          <div class="icon">
            <img src="../../assets/icons/set.png"/>
          </div>
          <div class="text">账号设置</div>
          <img class="to" src="../../assets/icons/to.png"/>
        </div>
        <div class="li " @click="$router.push('/chart')">
          <div class="icon">
            <img src="../../assets/icons/opinion.png"/>
          </div>
          <div class="text">客服助手</div>
          <img class="to" src="../../assets/icons/to.png"/>
        </div>
        <div class="li ">
          <div class="icon">
            <img src="../../assets/icons/about.png"/>
          </div>
          <div class="text">软件说明</div>
          <img class="to" src="../../assets/icons/to.png"/>
        </div>
      </div>
      <div class="list">

        <div class="li " @click="onLogout">
          <div class="icon">
            <img src="../../assets/icons/logout.png"/>
          </div>
          <div class="text">退出登录</div>
          <img class="to" src="../../assets/icons/to.png"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '@/api/user'
export default {
  name: 'index',
  data () {
    return {
      userInfo: {} // 用户信息
    }
  },
  created () {
    // 如果用户登录了，则请求加载用户信息数据
    if (this.user) {
      this.loadUserInfo()
    } else {
      this.$router.push('/login')
    }
  },
  methods: {
    async loadUserInfo () {
      try {
        const { data } = await getUserInfo()
        this.$store.commit('setUserInfo', data.data)
        this.userInfo = data.data
      } catch (err) {
        this.$toast('获取数据失败，请稍后重试')
      }
    },
    onLogout () {
      // 退出提示
      // 在组件中需要使用 this.$dialog 来调用弹框组件
      this.$dialog.confirm({
        title: '确认退出吗？'
      }).then(() => {
        // on confirm
        // 确认退出：清除登录状态（容器中的 user + 本地存储中的 user）
        this.$store.commit('setUser', null)
        this.$router.push('/login')
      }).catch(() => {
        // on cancel
      })
    }
  },
  mounted () {},
  computed: {
    ...mapState(['user'])
  }
}

</script>
<style scoped lang="less">
.top {
  height: 140px;
}

.header {
  background: #fff;
  height: 300px;
  padding-bottom: 0px;

  .bg {
    width: 100%;
    height: 300px;
    padding-top: 100px;
    background-color: #4398ed;
    background: url('../../assets/banner.png');
  }
}

.box {
  width: 650px;
  height: 280px;
  border-radius: 20px;
  margin: 0 auto;
  background: url('../../assets/banner.png');
  box-shadow: 0 5px 20px 0px rgba(0, 0, 150, .2);

  .box-hd {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    justify-content: center;

    .avator {
      width: 160px;
      height: 160px;
      background: #fff;
      border: 5px solid #fff;
      border-radius: 50%;
      margin-top: -80px;
      overflow: hidden;

      img {
        background-size: cover;
        width: 100%;
        height: 100%;
      }

      avatar {
        width: 60px;
        height: 60px;
      }
    }

    .phone-number {
      font-weight: 600;
      font-size: 45px;
      width: 75%;
      color: #333;
      text-align: center;
    }
  }

  .box-bd {
    display: flex;
    flex-wrap: nowrap;
    flex-direction: row;
    justify-content: center;

    .item {
      flex: 1 1 1;
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      justify-content: center;
      margin: 20px 20px;
      &:last-child {
        border: none;
      }
      span{
        color: #ffffff;
        font-size: 38px;
      }
      .icon {
        flex-shrink: 0;
        width: 20px;
        height: 20px;

        img {
          width: 20px;
          height: 20px;
        }
      }

      .text {
        color: #fff;
        width: 100%;
        font-size: 30px;
        text-align: center;
        margin-top: 10px;
      }
    }
  }
}

.list-content {
  background: #fff;
}

.list {
  width: 100%;
  border-bottom: 15px solid #f1f1f1;
  background: #fff;

  &:last-child {
    border: none;
  }

  .li:active {
    background-color: #eee;
  }

  .li {
    box-sizing: border-box;
    width: 100%;
    height: 90px;
    padding: 0 4%;
    border-bottom: 1px solid rgb(243, 243, 243);
    display: flex;
    align-items: center;

    &.noborder {
      border-bottom: 0
    }

    .icon {
      flex-shrink: 0;
      margin-bottom: 40px;
      width: 40px;
      height: 40px;
      img {
        width: 40px;
        height: 40px;
      }
    }

    .text {
      padding-left: 20px;
      width: 100%;
      font-size: 30px;
      color: #666;
    }

    .to {
      padding-right: 0px;
      flex-shrink: 0;
      width: 40px;
      height: 40px;
    }
  }
}
</style>
