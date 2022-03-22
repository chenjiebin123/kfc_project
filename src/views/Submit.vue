<template>
  <div class="submit">
    <div class="nav">
      <van-nav-bar
        title="订单结算"
        left-text="返回"
        left-arrow
        fixed
        @click-left="onClickLeft"
      />
    </div>
    <div>
      <van-cell is-link @click="showPopup">选择地址</van-cell>
      <van-popup
        v-model="show"
        position="bottom"
        closeable
        :style="{ height: '30%', paddingTop: '50px' }"
      >
        <div>
          <van-address-list
            v-model="chosenAddressId"
            :list="list"
            default-tag-text="默认"
            @add="onAdd"
            @edit="onEdit"
            @select="select"
          />
        </div>
      </van-popup>
    </div>
    <div class="address_text">
      <div class="title">
        <div class="name">
          {{ addressList.name }}
        </div>
        <div class="tel common">
          {{ addressList.tel }}
        </div>
        <div class="default common" v-show="addressList.isDefault">默认</div>
      </div>
      <div class="address_detail">
        {{ addressList.address }}
      </div>
    </div>
    <div class="product_before">
        <div class="product_title">订单信息</div>
        <div class="card_box"
            v-for="(item,index) in productList" :key="index"
        >
            <van-card
                :num='item.count'
                :price='item.product.Price'
                :title="item.product.name"
                :thumb="item.product.largeImg"
            />
        </div>
    </div>
    <hr class="hr" />
    <div class="product_after">
        <div class="product_time">订单时间 :{{time}}</div>
        <div class="product_text">
            <div class="product_num">商品数量 {{num}}</div>
            <div class="product_allPrice">总金额: {{allPrice.toFixed(2)}}</div>
        </div>
    </div>
    <van-submit-bar button-text="提交订单" @submit="submit" />
  </div>
</template>
<script>
import { findAddress , order} from "@/nw/url.js";
export default {
  name: "submit",
  data() {
    return {
      chosenAddressId: "",
      list: [],
      show: false,
      addressList: "",
      time:"",
      productList:[],
      num:0,
      allPrice:0
    };
  },
  methods: {
    async findAddress() {
      let id = localStorage.getItem("CStk");
      let res = await findAddress(id);
      if (res.status === 200) {
        let arr = res.data.data;
        if (arr.length === 0) {
          this.flag = true;
          return;
        } else {
          this.flag = false;
        }

        arr.forEach((v, i) => {
          //     每次循环 创建新的变量
          let obj = {
            id: i,
            name: v.name,
            tel: v.phone,
            address: `${v.area}/${v.detialArea}`,
            isDefault: v.defaultAddress,
            mail: v.mail,
            addId: v.addId,
          };
          //  将 每次处理好的数据 存储到list里
          this.list.push(obj);
        });
        this.list.forEach((v, i) => {
          if (v.isDefault) {
            this.chosenAddressId = v.id;
            this.list.unshift(v);
            this.list.splice(i + 1, 1);
          }
        });
        this.addressList = this.list[0];
      }
    },
    async submit() {
      let info = {
        id:localStorage.getItem("CStk"),
        product:this.productList,
        allPrice:this.allPrice,
        address:this.addressList
      }
      let result = await order(info)
      console.log("提交订单",result);
      if(result.status === 200 ) {
        if(result.data.stutas ===1401){
          this.$router.push("/order")
        }
      }
    },
    select(item,index){
        this.$dialog.confirm({
            title:'是否切换地址'
        })
        .then(()=>{
            this.addressList = item;
            this.show = false;
        })
        .catch(()=>{
            this.$toast.fail("用户取消切换");
            this.chosenAddressId = 0
        })
    },
    onAdd(){
        this.$router.push("/addressEdit")
    },
    onEdit(item,index){
        this.$router.push({
            name:"AddressEdit",
            params:{
                list:item,
                index
            }
        })
    },
    showPopup() {
        this.show = true
    },
    onClickLeft() {
        this.$router.go(-1)
    },
    sum() {
        this.productList.forEach(v=>{
          // console.log(v);
            this.num+=v.count;
            this.allPrice+=v.product.Price*v.count
        })
    },
    

  },
  created(){
      this.productList=this.$route.params.list
      // console.log(this.productList);
      this.findAddress()
      this.time =localStorage.getItem("time")
      this.sum()
  },
  // filters:{
  //   showPrice(allPrice){
  //     return allPrice.toFixed(2)
  //   }
  // }
};
</script>
<style lang="less" scoped>
.submit {
    min-height: 100vh;
    background-color: #f0f0f0;
    padding: 47px 0 70px 0;
    .nav {
    //  通过黏性定位 当页面滑动 把导航固定在顶部
    z-index: 99;
    // 深度修改 样式   sass   ::deep
    /deep/ .van-nav-bar__text {
      color: #ff3b3b;
    }
    /deep/ .van-icon {
      color: #ff3b3b;
    }
  }
    .address_text{
        font-size: 16px;
        padding: 0 10px;
        padding-bottom: 10px;
        background-color: #fff;
        .title {
            display: flex;
            align-items: center;
            .name {

            }
            .tel {
                
            }
            .default {
                height: 20px;
                color: #fff;
                font-size: 14px;
                padding: 0 5px;
                border-radius: 30px;
                background-color: red;
                line-height: 20px;
            }
            .common {
                margin-left: 10px;
            }
        }
        .address_detail {
            padding-top: 5px;
        }
    }
    .product_before {
        padding: 8px;
        border-radius: 0 0 15px 15px;
        margin: 0 10px;
        margin-top: 20px;
        background-color: #fff;
        .product_title{
            font-size: 16px;
            margin: 5px 0;
        }
        .card_box {
            .van-card {
                background-color: #fff;
            }
        }
    }
    .hr {
        width: 90%;
        border: 1px dashed;
        margin: 0 auto;
        transition: all 0.2s linear;
        animation: 4s linear 0s infinite alternate box;
    }
    @keyframes box {
        0% {
            width: 90%;
        }
        50% {
            width: 50%;
        }
        100% {
            width: 90%;
        }
    }
    /deep/ .product_after {
        font-style: 16px;
        padding: 8px;
        border-radius: 15px 15px 0 0;
        margin: 0 10px;
        background-color: #fff;
        
        .product_text {
            margin-top: 10px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            .product_time {

            }
            .product_allPrice {

            }
        }
    }
}
</style>