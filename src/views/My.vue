<template>
  <div class="my">
    <div class="my-nav">
      <div class="nav-img">
      </div>
    </div>
    <div class="my-main">
      <div class="main-nav">
        <div class="left">
          <div class="nav-head">
          </div>
        </div>
        <div class="right">
          <div class="right-top"><span>陈杰彬</span></div>
          <div class="right-bottom">
            <span>这家伙很懒，什么也没有留下! </span>
          </div>
        </div>
      </div>
      <ul>
        <li>
          <div class="left">
            <span class="text">个人资料</span>
          </div>
          <div class="right">
            <span class="icon"><van-icon name="arrow" size="20" /></span>
          </div>
        </li>
        <li @click="goOrder">
          <div class="left">
            <span class="text">我的订单</span>
          </div>
          <div class="right">
            <span class="icon"><van-icon name="arrow" size="20" /></span>
          </div>
        </li>
        <li>
          <div class="left">
            <span class="text">我的收藏</span>
          </div>
          <div class="right">
            <span class="icon"><van-icon name="arrow" size="20" /></span>
          </div>
        </li>
        <li @click="goAddress">
          <div class="left">
            <span class="text">地址管理</span>
          </div>
          <div class="right" >
            <span class="icon"><van-icon name="arrow" size="20" /></span>
          </div>
        </li>
        <li>
          <div class="left">
            <span class="text">我的足迹</span>
          </div>
          <div class="right">
            <span class="icon"><van-icon name="arrow" size="20" /></span>
          </div>
        </li>
        <li>
          <div class="left" @click="goLogin">
            <span class="text">安全退出</span>
          </div>
          <div class="right">
            <span class="icon"><van-icon name="arrow" size="20" /></span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  created(){
  },
  methods:{
    goAddress(){
      this.$router.push({name:"Address"})
    },
    goOrder(){
      this.$router.push({name:"Order"})
    },
    goLogin(){
      this.$router.push({name:"Login"})
      localStorage.removeItem('CStk')
    },
  }
};
</script>
<style lang="less" scoped>
.my {
  position: relative;
  width: 100%;
  // overflow: hidden;
  .my-nav {
    img {
      width: 100%;
      height: 220px;
    }
  }
  .my-main {
    width: 350px;
    position: absolute;
    top: 180px;
    left: 50%;
    margin-left: -180px;
    padding:0 5px;
    border: 1px solid #fff;
    background: rgba(255, 255, 255, 0.5);
    border-radius: 10px;
    .main-nav {
      display: flex;
      justify-content: start;
      margin-bottom: 70px;
      img {
        // display: block;
        width: 50px;
        height: 50px;
        border-radius: 50%;
      }
      .right {
        margin-left: 30px;
        text-align: left;
        .right-top {
          font-size: 16px;
          font-weight: bolder;
          color: rgba(7, 105, 232);
          margin-bottom: 10px;
        }
        .right-bottom {
          color: #666;
          font-size: 13px;
        }
      }
    }
    ul li {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 0;
      border-bottom: 1px solid skyblue;
      .left {
        span {
          font-size: 14px;
          margin-left: 10px;
        }
      }
      .right {
        span {
          margin-right: 10px;
        }
      }
    }
  }
}
</style>