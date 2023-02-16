<template>
  <div class="user-chat-page">
    <van-nav-bar
      fixed
      left-arrow
      @click-left="$router.back()"
      title="小知同学"
    ></van-nav-bar>
    <!-- 聊天列表 -->
    <div class="chat-list" ref="list">
      <div
       class="chat-item"
       v-for="(item,i) in list"
       :key="i"
       :class="{left:item.name==='xz',right:item.name==='my'}">
        <van-icon  v-if="item.name==='xz'" name="xiaozhi"  />
        <div class="chat-pao">{{item.msg}}</div>
        <van-image fit="cover" round :src="myAvatar" v-if="item.name==='my'"/>
      </div>
    </div>
    <!-- 输入框 -->
    <div class="reply-container van-hairline--top">
      <van-field
        v-model.trim="value"
        left-icon="edit"
        placeholder="请描述您的问题"
      ></van-field>
      <span class="send" @click="send()">发送</span>
    </div>
  </div>
</template>

<script>
import { getUserProfile } from '@/api/user'
import soekctIO from 'socket.io-client'
export default {
  name: 'UserChatPage',
  data () {
    return {
      myAvatar: '',
      list: [
        { name: 'xz', msg: '我是小知同学，需要什么帮助吗？' },
        { name: 'my', msg: '你好' }
      ],
      value: '',
      io: null
    }
  },
  async created () {
    const res = await getUserProfile()
    console.log(res)
    this.myAvatar = res.data.data.photo
    this.io = soekctIO('http://toutiao.itheima.net', {
      query: {
        token: this.$store.state.user.token
      },
      transports: ['websocket']
    }
    )
    this.io.on('connect', () => {
      this.list.push({ name: 'xz', msg: '我是小知同学，需要什么帮助吗？' })
    })
    this.io.on('message', data => {
      this.list.push({ name: 'xz', msg: data.msg })
    })
  },
  beforeDestroy () {
    // 4. 关闭连接
    this.io.close()
  },
  methods: {
    send () {
      if (!this.value) return this.$toast('请输入内容')
      // 发送消息
      this.io.emit('message', { msg: this.value, timestamp: Date.now() })
      this.list.push({ name: 'my', msg: this.value })
      this.value = ''
      this.scrollBottom()
    },
    scrollBottom () {
      this.$nextTick(() => {
        // 思路：滚动的距离 = 可滚动的高度 - 自身高度
        const scrollHeight = this.$refs.list.scrollHeight
        const offsetHeight = this.$refs.list.offsetHeight
        this.$refs.list.scrollTop = scrollHeight - offsetHeight
      })
    }
  }
}
</script>
<style lang="less" scoped>
.user-chat-page {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background:#fff;
  padding: 46px 0 50px 0;
  .chat-list {
    margin-top: 80px;
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      font-size: 80px;
      padding: 10px;
      .van-image{
        vertical-align: top;
        width: 80px;
        height: 80px;
      }
      .geek-icon {
        font-size: 80px;
        line-height: 0;
      }
      .chat-pao{
        font-size: 30px!important;
        vertical-align: center;
        align-items: center;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 40px;
        border-radius: 4px;
        position: relative;
        padding: 10px;
        background-color: #e9ddbe;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before{
          content: "";
          width: 6px;
          height: 6px;
          position: absolute;
          top: 15px;
          background: #e9ddbe;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 10px;
    &::before{
      right: -3px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 10px;
    margin-right: 0;
    &::before{
      left: -3px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  font-size: 40px!important;
  position: fixed;
  left: 0;
  bottom: 0;
  height: 89px;
  width: 100%;
  background: #fff;
  z-index: 9999;
  display: flex;
  align-items: center;
  padding: 0 10px;
  > .van-field {
    flex: 1;
    background: #F7F8FA;
    height: 32px;
    border-radius: 16px;
    padding: 0 10px;
    line-height: 32px;
    ::v-deep .van-field__left-icon .van-icon {
      color: #ccc;
    }
  }
  > .send {
    margin-right: 60px;
    font-size: 24px;
    color: #999;
  }
}
</style>
