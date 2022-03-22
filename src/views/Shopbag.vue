<template>
  <div id="shopbag">
    <!-- 顶部导航start -->
    <div class="nav">
      <van-nav-bar
        title="购物车"
        left-text="返回"
        :right-text="flag ? '完成' : '编辑'"
        left-arrow
        @click-left="onClickLeft"
        @click-right="onClickRight"
      />
    </div>
    <!-- 顶部导航end -->
    <!-- 图片结构start -->
    <div class="banner_box">
      <van-swipe :autoplay="3000" :show-indicators="false">
        <van-swipe-item v-for="(item, index) in bannerData" :key="index">
          <img :src="item.bannerImg" class="auto_item" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <!-- 图片结构end-->
    <!-- 商品结构start -->
    <div v-show="isfalg">
      <van-empty description="暂无商品"></van-empty>
    </div>
    <div class="product_box" v-for="(v, i) in product" :key="i">
      <van-swipe-cell>
        <div class="product">
          <div class="check">
            <van-checkbox v-model="v.checked" @change="checkChange(v)" />
          </div>
          <van-card
            :price="v.product.Price"
            :title="v.product.name"
            class="goods-card"
            :thumb="v.product.largeImg"
          />
          <div class="step">
            <van-stepper v-model="v.count" theme="round" button-size="22" />
          </div>
        </div>
        <template #right>
          <van-button
            square
            text="删除"
            type="danger"
            class="delete-button"
            @click="del(v)"
          />
        </template>
      </van-swipe-cell>
    </div>
    <!-- 商品结构end-->
    <!-- 底部订单结构start -->
    <div class="footer">
      <van-submit-bar
        :price="money"
        :button-text="flag ? '删除' : '结算'"
        @submit="onSubmit"
        :button-color="flag ? '#f6a102' : ''"
      >
        <van-checkbox v-model="checkAll" @click="checkedAll">全选</van-checkbox>
        <template #tip>
          你的收货地址不支持同城送,
          <span @click="onClickEditAddress">修改地址</span>
        </template>
      </van-submit-bar>
    </div>
    <!-- 底部订单结构end-->
  </div>
</template>
<script>
import { getShop, delShop } from "@/nw/url.js";
export default {
  name: "Shopping",
  data() {
    return {
      bannerData: [],
      isfalg: false,
      checkAll: false,
      flag: false,
      product: "",
      img: "https://kfc.insideria.vip/uploads/attach/2021/06/20210624/c558a101ec068483d2de3d200f98041a.jpg",
    };
  },
  // 计算属性 可以监听 值的变化
  computed: {
    // 需要 计算的数据
    money() {
      // 计算的变量
      let price = 0;
      // 通过循环 判断 当前是否 选中
      for (let i = 0; i < this.product.length; i++) {
        // 选中 进行 金额累计
        if (this.product[i].checked) {
          price += this.product[i].product.Price * this.product[i].count;
        }
      }
      return price * 100;
    },
  },
  methods: {
    // 通过同步的方式 获取数据
    async getShop() {
      // 获取本地缓存 数据
      let id = localStorage.getItem("CStk");
      // 调用 封装好的 获取购物车数据的接口
      let result = await getShop(id);
      if (result.status === 200) {
        if (result.data.stutas === 1302) {
          // 给自身 加自定义属性
          let arr = result.data.data;
          arr.forEach((v) => {
            // 添加 checked 默认值为false
            v.checked = false;
          });
          //获取数据 赋值到自定义属性里
          this.product = result.data.data;
          console.log(this.product);
        }
        if (result.data.stutas === 1301) {
          this.product = [];
          this.checkAll = false;
          this.isfalg = true;
        }
      }
    },
    async delShop(info) {
      let result = await delShop(info);
      if (result.status === 200) {
        if (result.data.stutas === 1501) {
          this.$toast.success(result.data.msg);
          this.getShop();
        }
      }
      console.log(result);
    },
    // 监听 商品复选框的变化
    checkChange(v) {
      // 判断是否 勾选
      // if(v.checked){
      //   this.add(v)
      // }else{
      //   this.del(v)
      // }
      this.checkIdea();
    },
    // 单选逻辑
    checkIdea() {
      // 通过循环判断 当前的复选框 是否选中
      for (let i = 0; i < this.product.length; i++) {
        // 判断 如果未选中 进入if语句 取消全选
        if (!this.product[i].checked) {
          // 取消全选
          this.checkAll = false;
          return;
        }
        // 全选状态
        this.checkAll = true;
      }
    },
    // 全选逻辑
    checkedAll() {
      this.product.forEach((v) => {
        v.checked = this.checkAll;
      });
    },
    onClickLeft() {
      // 跳转到上一级页面
      this.$router.go(-1);
    },
    onClickRight() {
      this.flag = !this.flag;
    },
    onClickEditAddress() {
      this.$toast.success("成功点击了");
    },
    onSubmit() {
      let arr = [];
      if (this.flag) {
        
        this.product.forEach((v) => {
          if (v.checked) {
            arr.push(v.carId);
          }
        });
        if (arr.length === 0) {
          this.$toast.fail("请勾选商品");
          return;
        }
        let info = {
          carIdArr: arr,
          id: localStorage.getItem("CStk"),
        };
        this.delShop(info);
      } else {
        this.getTime();
        this.product.forEach((v) => {
          if (v.checked) {
            arr.push(v);
          }
        });
        if (arr.length === 0) {
          this.$toast.fail("请选择需要购买的商品");
          return;
        }
        this.getTime();
        this.$router.push({
          name: "Submit",
          params: {
            list: arr,
          },
        });
      }
    },
    del(v) {
      let info = {
        carIdArr: `[${v.carId}]`,
        id: localStorage.getItem("CStk"),
      };
      this.delShop(info);
    },
    getTime() {
      let time = new Date();
      let y = time.getFullYear();
      let m = time.getMonth() + 1;
      let d = time.getDate();
      let hh = time.getHours();
      let mm = time.getMinutes();
      let ss = time.getSeconds();
      let arr = [m, d, hh, mm, ss];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i] < 10) {
          arr[i] = "0" + arr[i];
        }
      }
      let newtime = `${y}-${arr[0]}-${arr[1]}-${arr[2]}-${arr[3]}:${arr[4]}`;
      localStorage.setItem("time", newtime);
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
  },
  created() {
    this.getShop();
    this.getBannerData();
  },
};
</script>
<style lang="less" scoped>
#shopbag {
  min-height: 100vh;
  padding-bottom: 130px;
  background-color: #f0f0f0;
  // 导航样式
  .nav {
    //  通过黏性定位 当页面滑动 把导航固定在顶部
    position: sticky;
    top: 0;
    z-index: 99;
    // 深度修改 样式   sass   ::deep
    /deep/ .van-nav-bar__text {
      color: #ff3b3b;
    }
    /deep/ .van-icon {
      color: #ff3b3b;
    }
  }
  // 图片样式
  .img_box {
    .img {
      width: 100%;
      //  去除图片的 间隙
      // display: block; //将元素 变成内联元素
      vertical-align: bottom; //将盒子的基线 重新对准 底部
    }
  }
  //   商品样式
  .product_box {
    box-shadow: 0 1px 3px 2px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    margin: 10px;
    background-color: #fff;
    overflow: hidden;
    .van-card__title {
      font-size: 14px;
    }
    .van-card__price {
      margin-right: 50px;
      color: #ff3b3b;
      font-weight: bold;
    }
    .product {
      position: relative;
      display: flex;
      align-items: center;
      .check {
        margin: 0 10px;
      }
      .van-card {
        background-color: #fff;
        flex: 1;
      }
      .step {
        position: absolute;
        right: 20px;
        bottom: 10px;
      }
    }
    .van-button {
      height: 100%;
    }
  }
  //   底部样式
  .footer {
    .van-submit-bar {
      bottom: 50px;
    }
  }
}
</style>