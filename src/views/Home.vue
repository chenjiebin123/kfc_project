<template>
  <div id="home">
    <!-- 头部 -->
    <van-nav-bar>
      <template #left>
        <div class="home_title">{{ timeText }}</div>
      </template>
      <template #right>
        <van-search placeholder="请输入商品名称" shape="round"  @click="search" />
      </template>
    </van-nav-bar>
    <!-- 轮播图 -->
    <div class="banner_box">
      <van-swipe :autoplay="3000" :show-indicators="false">
        <van-swipe-item v-for="(item, index) in bannerData" :key="index">
          <img :src="item.bannerImg" class="auto_item" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 推荐商品列表 -->
    <div class="hot_product">
      <div class="hot_product_title">热门推荐</div>
      <div class="product_box">
        <div
          class="product_item"
          v-for="(item, index) in hotProducts"
          :key="index"
          @click="gotoDetail(item)"
        >
          <div class="pro_img">
            <img :src="item.smallImg" alt="" class="auto_img" />
          </div>
          <div class="pro_name one_text">{{ item.name }}</div>
          <div class="pro_price">￥{{ item.Price }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      bannerData: [],
      timeText: "",
      hotProducts: [],
    };
  },
  created() {
    this.getTime();
    this.getBannerData();
    this.getHotProducts();
  },
  methods: {
    getTime() {
      var hours = new Date().getHours();
      if (hours >= 6 && hours < 12) {
        this.timeText = "早上好";
      } else if (hours >= 12 && hours < 18) {
        this.timeText = "下午好";
      } else if (hours >= 18 && hours < 24) {
        this.timeText = "晚上好";
      } else {
        this.timeText = "深夜好";
      }
    },
    getBannerData() {
      this.axios({
        method: "get",
        url: "/bannar",
      })
        .then((res) => {
          // console.log(res);
          if (res.data.status == 1102) {
            this.bannerData = res.data.data.result;
            // console.log(this.bannerData);
          }
        })
        .catch((err) => {});
    },
    getHotProducts() {
      this.axios({
        methods: "get",
        url: "/product",
        params: {
          key: "recommend",
          value: true,
        },
      })
        .then((res) => {
          // console.log("成功");
          if (res.data.status == 1002) {
            this.hotProducts = res.data.data;
          }
        })
        .catch((err) => {});
    },
    gotoDetail(i) {
      // console.log(i);
      this.$router.push({ 
        path: "/detail",
        query:{
          pid : i.pid
        }
      });
    },
    search() {
      this.$router.push("Search")
    }
  },
};
</script>
<style lang="less">
.home_title {
  font-size: 20px;
  font-weight: bold;
  color: #333;
}
.van-nav-bar .van-icon {
  color: #ff3b3b;
}
.van-search__content {
  background-color: #f0f0f0;
}
.van-search {
  padding: 0;
}
.hot_product {
  margin-top: 10px;
  text-align: left;
  padding: 0 14px;
  margin-bottom: 50px;
  .hot_product_title {
    font-size: 18px;
    font-weight: bold;
    color: #333;
    padding: 10px 0;
    margin: 10px 0;
  }
  .product_box {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    .product_item {
      // border: 1px solid;
      box-shadow: 0 1px 3px 2px rgba(0, 0, 0, .2);
      border-radius: 10px;
      width: 40%;
      padding: 15px;
      margin-bottom: 10px;
      .pro_img img {
        width: 140px;
      }
      .pro_name {
        font-size: 16px;
        font-weight: bold;
        color: #333;
        margin: 5px 0;
      }
      .pro_price {
        font-size: 16px;
      }
    }
  }
}
</style>