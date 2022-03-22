<template>
  <div class="search">
    <div class="nav">
      <van-nav-bar
        title="搜索"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="search_box">
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        @search="search"
      />
    </div>
    <div class="product">
      <div
        class="product_box"
        v-for="(item, index) in productList"
        :key="index"
        @click="goDetail(item)"
      >
        <van-card
          num="1"
          :price="item.Price"
          :title="item.name"
          :thumb="item.largeImg"
        />
      </div>
    </div>
  </div>
</template>
<script>
import { search } from "@/nw/url.js";
export default {
  name: "Search",
  data() {
    return {
      value: "",
      productList: [],
    };
  },
  methods: {
    async search(key) {
      let res = await search(key);
      console.log(res);
      if (res.status === 200) {
        if (res.data.stutas === 1902) {
          this.productList = res.data.data;
        }
      }
    },
    goDetail(item) {
      this.$router.push({
        path: "/detail",
        query: {
          pid: item.pid,
        },
      });
    },
    onClickLeft() {
      this.$router.go(-1);
    },
  },
  created() {
    let { key } = this.$route.query;
    this.value = key;
    this.search(key);
  },
};
</script>
<style lang="less" scoped>
.search{
  min-height: 100vh;
  background-color: #f0f0f0;
  .nav {
    position: sticky;
    top: 0;
    z-index: 99;
    background-color: #fff;
    /deep/ .van-nav-bar__text {
      color: #ff3b3b;
    }

    /deep/ .van-icon {
      color: #ff3b3b;
    }
  }
  .search_box{
    /deep/.van-search{
      padding: 0;
      border-radius: 50px;
      margin: 10px;
      overflow: hidden;
    }
  }
  .product{
    margin: 0 10px;
    .product_box{
      box-shadow: 0 2px 3px 2px rgba(0,0,0,0.2);
      border-radius: 10px;
      margin-bottom: 10px;
      overflow: hidden;
    }
  }
}
</style>