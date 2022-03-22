<template>
  <div class="detail">
    <!-- 顶部导航结构start -->
    <div class="nav">
      <van-nav-bar
          title="详情页"
          left-text="返回"
          :left-arrow="true"
          @click-left="onClickLeft"
      />
    </div>
    <!-- 顶部导航结构end -->
    <!-- 图片 结构start -->
    <div class="detail_img">
      <img :src="product.largeImg" class="img" />
    </div>
    <!-- 图片 结构end -->
    <div class="detail_product">
      <!-- 商品活动 的提示信息 -->
      <div>
        <van-notice-bar
            left-icon="volume-o"
            text="在代码阅读过程中人们说脏话的频率是衡量代码质量的唯一标准。"
        />
      </div>
      <!-- 商品名称 -->
      <div class="product_title">
        <span class="text">商品名称: </span> {{ product.name }}
        <!-- 商品金额 -->
        <div class="price_box">
          <div class="price">￥{{ product.Price }}</div>
          <span class="prices">￥{{ product.Price * 2 }}</span>
        </div>
      </div>
      <!-- 商品数量 -->
      <div class="sumMoney">
        <span class="text">商品数量:</span
        ><van-stepper v-model="value" theme="round" button-size="22" />
      </div>
      <!-- 商品类型 -->
      <div class="product_type">
        <span class="text">商品类型:</span>
        <div class="type" v-for="(item, index) in product.desc" :key="index">
          {{ item }}
        </div>
      </div>
      <!-- 详情结构 -->
      <div class="page">
        <van-tabs v-model="active">
          <van-tab title="商品详情">
            <div
                class="detail_text"
                v-for="(item, index) in product.notice"
                :key="index"
            >
              {{ index + 1 }}.{{ item }}
            </div>
          </van-tab>
          <van-tab title="评价">内容 2</van-tab>
        </van-tabs>
      </div>
    </div>
    <!-- 底部商品导航start -->
    <div class="footer_detail">
      <van-goods-action>
        <van-goods-action-icon
            icon="cart-o"
            text="购物车"
            :badge="shopList.length"
            to="/shopbag"
            :color="flag?'#ff3b3b':''"
        />
        <van-goods-action-icon icon="star-o" text="收藏" badge="12" />
        <van-goods-action-button
            type="warning"
            text="加入购物车"
            @click="addShop"
        />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
    <!-- 底部商品导航end -->
  </div>
</template>
<script>
import { addShop, getShop } from "@/nw/url.js"
export default {
  name: "Detail",
  data() {
    return {
      product: "",
      active: 0,
      value: "",
      shopList:[],
      flag: false
    }
  },
  methods: {
    // 获取详情页信息
    getDetail(pid) {
      this.axios({
        url: "/detail",
        params: {
          pid
        }
      }).then(res => {
        // console.log(res);
        if (res.status === 200) {
          if (res.data.status === 702) {
            //   把数据 赋值到自定义属性里
            this.product = res.data.data[0]
            // console.log(this.product);
            this.getShop()
            this.light(this.product)
          }
        }
      })
    },
    // 添加购物车
    addShop() {
      // 配置 相应的参数
      let info={
        // 获取本地缓存数据
        id: localStorage.getItem('CStk'),
        count: this.value,
        product: this.product
      }
      // 调用 封装好的 接口
      addShop(info).then(res=>{
        if (res.status === 200) {
          if (res.data.stutas === 1201) {
            this.$toast.success(res.data.msg)
            this.getShop()
          } else {
            this.$toast.fail(res.data.msg)
          }
        }
      })
    },
    async getShop() {
      // 获取本地缓存 数据
      let id = localStorage.getItem('CStk')
      // 调用 封装好的 获取购物车数据的接口
      let result = await getShop(id)
      if (result.status === 200) {
        if (result.data.stutas === 1302) {
          this.shopList = result.data.data;
          this.light(this.product);
        }
      }
    },

    light(shop){
      this.shopList.forEach(v =>{
        if(v.product.pid === shop.pid) {
          this.flag=true;
          return;
        }
      })
    },
    onClickLeft() {
      // 调用路由api 跳转到上一级页面
      this.$router.go(-1)
    },

  },
  created() {
    //    解构赋值
    let { pid } = this.$route.query
    //    调用获取 商品详情数据的方法
    this.getDetail(pid)
  }

}
</script>

<style lang="less" scoped>
.detail {
  min-height: 100vh;
  background-color: #f0f0f0;
  // 导航样式
  .nav {
    // 深度修改 样式   sass   ::deep
    /deep/ .van-nav-bar__text {
      color: #ff3b3b;
    }
    /deep/ .van-icon {
      color: #ff3b3b;
    }
  }
  // 图片样式
  .detail_img {
    .img {
      width: 100%;
      // 去除图片 产生的间隙
      display: block;
      // vertical-align: bottom;
    }
  }
  //商品详情样式
  // 常用用的定位 相对定位： relative 绝对定位：absolute 黏性定位:sticky 固定定位：fixed
  .detail_product {
    padding-bottom: 70px;
    border-radius: 10px 10px 0 0;
    .text {
      font-size: 18px;
      font-weight: bold;
    }
    .product_title {
      font-size: 16px;
      padding: 10px;
      margin: 10px 0;
      background-color: #fff;
      .price_box {
        margin: 5px 0;
        display: flex;
        .price {
          color: #ff3b3b;
          font-weight: bold;
        }
        .prices {
          color: #ccc;
          margin-left: 10px;
          font-style: oblique;
          text-decoration: line-through;
        }
      }
    }
    .sumMoney {
      padding: 10px;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
    }
    .product_type {
      font-size: 16px;
      padding: 10px;
      margin: 10px 0;
      background-color: #fff;
      display: flex;
      // 交叉轴方向居中
      align-items: center;
      // 换行
      flex-wrap: wrap;
      .type {
        min-width: 80px;
        padding: 2px 10px;
        border-radius: 30px;
        box-shadow: 0 1px 3px 2px rgba(0, 0, 0, 0.1);
        margin: 0 10px;
        text-align: center;
      }
      .type:nth-of-type(n + 3) {
        margin-left: 0;
        margin-top: 5px;
      }
    }
    .page {
      min-height: 80px;
      background-color: #fff;
      .van-tab__pane {
        background-color: #fff;
      }
      .detail_text {
        font-size: 14px;
        padding: 0 10px;
        padding-top: 5px;
      }
      .detail_text:last-child {
        padding-bottom: 10px;
      }
    }
  }
  .footer_detail {
    /deep/.van-goods-action {
      z-index: 99;
    }
  }
}
</style>