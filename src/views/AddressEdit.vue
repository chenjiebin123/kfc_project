<template>
  <div class="address_edit">
    <!-- 顶部导航start -->
    <div class="nav">
      <van-nav-bar
        title="地址编辑"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <!-- 顶部导航end -->
    <div>
      <van-address-edit
        :area-list="areaList"
        :address-info="list"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
      />
    </div>
  </div>
</template>
<script>
// 引入下载的 地区数据表
import { areaList } from '@vant/area-data';
import { address, deleteAddress } from "@/nw/url.js"
export default {
  name: "AddressEdit",
  data() {
    return {
      areaList,
      searchResult: [],
      list: {}
    }
  },
  methods: {
    //   添加地址
    async address(info) {
      let result = await address(info)
      // console.log(result);
      // 判断 是否请求成功
      if (result.status === 200) {
        // 判断是否 有数据
        if (result.data.stutas === 1999) {
          // 轻提示
          this.$toast.success(result.data.msg)
         
        } else {
          this.$toast.fail(result.data.msg)
        }
      }
    },
    // 删除 地址
    async deleteAddress(info) {
      let res = await deleteAddress(info)
      if(res.status===200){
        if(res.data.stutas===9901){
          this.$toast.success(res.data.msg)
           // 返回 上一级
          this.$router.go(-1)
        }else{
          this.$toast.fail(res.data.msg)
          
        }
      }
      console.log(res);
    },
    // 获取初始化的数据 进行格式 处理
    change(list) {
      // 判断 当前 是否 为删除的逻辑
      if(!list){
        //否 则 终止后续代码的执行
        return
      }
      // 将地区 裁切成 数组的格式
      let arr = list.address.split("/")
      let area=JSON.parse(localStorage.getItem("areaCode"))[this.index]
      // 进行页面 初始化值的处理
      this.list = {
        addressDetail: arr[1],
        isDefault: list.isDefault,
        name: list.name,
        tel: list.tel,
        postalCode: list.mail,
        addId: list.addId,
        areaCode:area.areaCode
      }
    },
    onClickLeft() {
      // 返回上一级
      this.$router.go(-1)
    },
    onSave(e) {
      console.log(e);
      // 处理添加地址的数据
      let info = {
        userId: localStorage.getItem("CStk"),
        name: e.name,
        phone: e.tel,
        area: `${e.province}/${e.city}/${e.county}`,
        detialArea: e.addressDetail,
        mail: e.postalCode,
        defaultAddress: e.isDefault,
      }
      let areaCode=JSON.parse(localStorage.getItem("areaCode")) ||[]
      let obj={
        addId:e.addId,
        areaCode:e.areaCode
      }
      areaCode.push(obj)
      localStorage.setItem("areaCode",JSON.stringify(areaCode))
      // 调用添加地址的方法 传入实参
      this.address(info)

    },
    // 删除键
    onDelete() {
      // 处理 删除参数的数据
      let info = {
        userId: localStorage.getItem("CStk"),
        addId: this.list.addId
      }
      // 调用删除地址的方法 并且传实参
      this.deleteAddress(info)


    },

  },
  created() {
    // console.log(this.$route);
    //  解构赋值
    let { list } = this.$route.params
    this.index = this.$route.params.index
    // this.index= this.$route.params.index

    // console.log(index);
    //  调用 处理 初始数据的方法
    this.change(list)

  }
}
</script>
<style lang="less" scoped>
.address_edit {
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
}
</style>