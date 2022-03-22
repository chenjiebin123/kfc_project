<template>
  <div class="addressList">
      <!-- 顶部导航start -->
    <div class="nav">
      <van-nav-bar
        title="地址列表"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!-- 顶部导航end -->
      <!-- 空状态 -->
      <div>
          <van-empty description="描述文字" v-show="flag"/>
      </div>
      <!-- 地址列表 -->
      <div>
           <van-address-list
      v-model="chosenAddressId"
      :list="list"
      default-tag-text="默认"
      @add="onAdd"
      @edit="onEdit"
    />
      </div>
   
  </div>
</template>
<script>
import { findAddress } from "@/nw/url.js"
export default {
  name: "AddressList",
  data() {
    return {
      chosenAddressId:"",
      list: [],
      flag:false,
    };

  },
  methods: {
    //   查询地址列表数据
    async findAddress() {
      let id = localStorage.getItem("CStk")
      let res = await findAddress(id)
     
      if(res.status===200){
        //   将需要的数据 赋值给变量
         let arr=res.data.data
          if(arr.length===0){
              this.flag=true
              return
          }else{
              this.flag=false
          }
       
        //  循环数据 进行格式 处理
         arr.forEach((v,i) => {
            //     每次循环 创建新的变量
             let obj={
                 id:i,
                 name:v.name,
                 tel:v.phone,
                 address:`${v.area}/${v.detialArea}`,
                 isDefault:v.defaultAddress,
                 mail:v.mail,
                 addId:v.addId
             }
            //  将 每次处理好的数据 存储到list里
             this.list.push(obj)
         });
         console.log(this.list);
        //  循环 处理好的数组 
         this.list.forEach((v,i)=>{
            //  判断 当前的数据 是否 是默认地址
             if(v.isDefault){
                //  将选中 状态 选中成默认地址
                this.chosenAddressId=v.id
                //  调用数组api 将默认地址 推到 第一项
                this.list.unshift(v)
                // 调用数组api 将 重复的数据 裁切
                this.list.splice(i+1,1)
             }
         })
         
      }
    },
    onAdd() {
      this.$router.push("/addressEdit")
    },
    onEdit(item, index) {
        console.log(item,index);
      this.$router.push({
          name:"AddressEdit",
          params:{
              list:item,
              index:index
          }
      })
    },
    onClickLeft(){
        this.$router.go(-1)
    }
  },
  created() {
      this.findAddress()
  }
}
</script>
<style lang="less" scoped>
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
</style>