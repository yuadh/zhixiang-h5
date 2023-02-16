<template>
  <div class="layout-container">
    <!-- 子路由出口 -->
    <router-view />
    <!-- /子路由出口 -->

    <!-- 标签导航栏 -->
    <!--
      route: 开启路由模式
     -->
    <van-tabbar class="layout-tabbar"  route>
      <van-tabbar-item  to="/">
        <div class="box">
            <Icon type="doc-shouye" class="zhixiang-icon"/>
        </div>
        <span class="text">首页</span>
      </van-tabbar-item>
      <van-tabbar-item  to="/profile">
        <div class="box">
            <Icon type="doc-wode" class="zhixiang-icon"/>
        </div>
        <span class="text">{{ $store.state.user ? '我的' : '登录' }}</span>
      </van-tabbar-item>
    </van-tabbar>
    <!-- /标签导航栏 -->
  </div>
</template>

<script>
import Icon from '@/components/Icon/index.vue'
export default {
  name: 'LayoutIndex',
  components: {
    Icon
  }
}
</script>

<style scoped lang="less">
.layout-container {
  .layout-tabbar {
    .box{
        margin-top: -10px;
    }
    .zhixiang-icon {
      font-size: 20px;
    }
    span.text {
      display: inline-block;
      margin-top: 10px;
      font-size: 20px;
    }
  }
}
</style>
