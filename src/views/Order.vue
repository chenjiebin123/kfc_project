<template>
  <div id="order">
    <div class="nav">
      <van-nav-bar
        title="订单结算"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div>
      <van-tabs v-model="active" animated @click="getOrder">
        <van-tab v-for="(item, index) in list" :key="index" :title="item.title">
          <van-empty description="暂无订单" v-show="isShow" />
          <div
            class="order_box"
            v-for="(item, index) in productList"
            :key="index"
          >
            <div class="product_before">
              <div class="product_box">
                <div class="product_title">订单信息: {{item.orderNo}}</div>
                <div class="product_send" @click="reserve(item, index)">
                  {{ item.flag ? "删除" : "确认收货" }}
                </div>
              </div>
              <div class="card_box">
                <div v-for="(v, i) in item.product" :key="i">
                  <van-card
                    :num="v.count"
                    :price="v.product.Price"
                    :title="v.product.name"
                    :thumb="v.product.largeImg"
                  />
                </div>
              </div>
            </div>
            <hr class="hr" />
            <div class="product_after">
              <div class="product_time">订单时间:{{ item.created_at }}</div>
              <div class="product_text">
                <div class="product_num">商品数量: {{item.sum}}</div>
                <div class="product_allPrice">
                  总金额:{{ item.allPrice.toFixed(2) }}
                </div>
              </div>
            </div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
import { getOrder, take, delectOrder } from "@/nw/url.js";
export default {
  name: "Order",
  data() {
    return {
      active: 0,
      list: [
        {
          id: 1,
          title: "全部",
        },
        {
          id: 2,
          title: "已收货",
        },
        {
          id: 3,
          title: "未收货",
        },
      ],
      productList: [],
      isShow: false,
    };
  },
  methods: {
    async getOrder(name) {
      let count = -(name - 2);
      // console.log(count);
      let info = {
        id: localStorage.getItem("CStk"),
        stutas: count,
      };
      let res = await getOrder(info);
      console.log(res);
      if (res.status === 200) {
        if (res.data.stutas === 1902) {
          this.productList = res.data.data;
          // console.log(this.productList);
          // console.log(this.productList[0].product);
          this.isShow = false;
          console.log(this.productList);
          var v1 = this.productList;
          for (let i = 0; i < v1.length; i++) {
            let number = 0
            console.log(v1[i]);
            for (let j = 0; j < v1[i].product.length; j++) {
              console.log(v1[i].product[j]);
              number += v1[i].product[j].count;
            }
            v1[i].sum=number
          }
          // console.log(this.number);
          this.productList.forEach((v) => {
            // console.log(v);
            if (v.stutas === 1) {
              v.flag = true;
            }
            if (v.stutas === 0) {
              v.flag = false;
            }
          });
        }
        if (res.data.stutas === 1901) {
          this.productList = res.data.data;
          this.isShow = true;
        }
      }
    },

    async reserve(item, index) {
      let info = {
        id: localStorage.getItem("CStk"),
        orderId: item.orderId,
      };

      if (item.stutas === 0) {
        let res = await take(info);
        if (res.status === 200) {
          if (res.data.stutas === 1311) {
            this.$toast.success("收货成功");
            this.productList[index].flag = false;
          }
        }
      }
      if (item.stutas === 1) {
        console.log(1);
        this.$dialog
          .confirm({
            title: "是否删除订单",
          })
          .then(() => {
            delectOrder(info).then((res) => {
              if (res.status === 200) {
                if (res.data.stutas === 502) {
                  this.$toast.success("删除订单成功");
                  // this.productList[index].flag = true;
                  this.getOrder(name);
                }
              }
            });
          })
          .catch(() => {});
      }
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    
  },
  created() {
      this.getOrder(name);
    },
};
</script>
<style lang="less" scoped>
#order {
  padding-bottom: 50px;
  .nav {
    position: sticky;
    top: 0;
    z-index: 99;
    /deep/ .van-nav-bar__text {
      color: #ff3b3b;
    }
    /deep/ .van-icon {
      color: #ff3b3b;
    }
  }
  .order_box {
    border: 1px solid #ccc;
    border-radius: 10px;
    margin: 5px;
    box-shadow: 0 0 3px #ccc;
    .product_before {
      .product_box {
        display: flex;
        width: 100%;
        justify-content: space-around;
        .product_title {
          margin-top: 5px;
          height: 20px;
          text-align: center;
          line-height: 20px;
        }
        .product_send {
          margin-top: 5px;
          height: 20px;
          width: 70px;
          border-radius: 10px;
          text-align: center;
          line-height: 20px;
          background-color: #f0f0f0;
          &:active {
            background-color: red;
            color: #fff;
          }
        }
        
      }
      .card_box {
        border-top: 1px solid #ccc;
        margin-top: 5px;
        .van-card__header {
          // border: 1px solid #ccc;
        }
      }
    }
    .product_after {
      .product_text{
        margin: 5px 0;
        display: flex;
        justify-content: space-around;
      }
    }
  }
}
</style>