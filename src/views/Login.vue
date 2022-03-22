<template>
  <div id="login">
    <van-nav-bar title="登录" left-arrow @click-left="goPage" />
    <div class="logo_img">
      <img src="../assets/images/icon-kfc.png" alt="" />
      <div class="login_text">肯德基</div>
    </div>
    <div class="login_form">
      <van-form @submit="onSubmit">
        <van-field
          v-model="userLoginInfo.userphone"
          placeholder="请输入手机号码"
        />
        <van-field
          v-model="userLoginInfo.password"
          :type="isShowLoginPsd ? 'text' : 'password'"
          placeholder="请输入密码"
          :right-icon="isShowLoginPsd ? 'eye-o' : 'closed-eye'"
          @click-right-icon="showPsd('isShowLoginPsd')"
        />
        <div class="clearfix forgot">
          <span class="fr">忘记密码</span>
        </div>
        <div class="login-btn">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            @click="login"
            class="userlogin"
            >立即登录</van-button
          >
        </div>
        <div class="reg_btn">
          <van-button
            round
            block
            type="default"
            class="userzc"
            @click="showRegister"
            >注册</van-button
          >
        </div>
      </van-form>
    </div>

    <van-popup
      v-model="isRegister"
      closeable
      position="bottom"
      class="popup-box"
    >
      <div class="register_title">注册账号</div>
      <div class="login_form">
        <van-form @submit="onSubmit">
          <van-field
            label="手机号"
            label-width="1.2rem"
            v-model="userregister.userphone"
            placeholder="请输入手机号码"
          />
          <van-field
            label="昵称"
            label-width="1.2rem"
            v-model="userregister.name"
            placeholder="2-10个字符"
          />
          <van-field
            label="密码"
            label-width="1.2rem"
            v-model="userregister.password"
            :type="isShowRegPsd ? 'text' : 'password'"
            placeholder="请输入密码"
            :right-icon="isShowRegPsd ? 'eye-o' : 'closed-eye'"
            @click-right-icon="showPsd('isShowRegPsd')"
          />
          <div class="login-btn">
            <van-button
              round
              block
              type="info"
              native-type="submit"
              class="userlogin"
              @click="registeruser"
              >注&nbsp;&nbsp;册</van-button
            >
          </div>
        </van-form>
      </div>
    </van-popup>
  </div>
</template>
<script>
import { Notify } from "vant";
import { vaildForm } from "../assets/js/vaildForm";
export default {
  data() {
    return {
      userLoginInfo: {
        userphone: "",
        password: "",
      },
      userregister: {
        userphone: "",
        password: "",
        name: "",
      },
      isShowLoginPsd: false,
      isShowRegPsd: false,
      isRegister: false,
    };
  },
  methods: {
    goPage() {
      console.log("返回");
      // this.$router.push({ name: "Home" });
    },
    showPsd(type) {
      this[type] = !this[type];
    },
    onSubmit(values) {
      // console.log("submit", values);
    },
    showRegister() {
      this.isRegister = true;
    },
    registeruser() {
      var userInfo = this.userregister;
      var o = {
        userphone: {
          value: userInfo.userphone,
          reg: /^1[3-9]\d{9}$/,
          errMsg: "手机格式不正确",
        },
        name: {
          value: userInfo.name,
          reg: /^[\w\u4e00-\u9fa5]{2,10}$/,
          errMsg: "昵称格式不正确",
        },
        password: {
          value: userInfo.password,
          reg: /^[A-z]\w{5,17}$/,
          errMsg: "密码格式不正确",
        },
      };
      if (!vaildForm.vaild(o)) {
        return;
      }
      this.$toast.loading({
        message: "注册中......",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "get",
        url: "/register",
        params: {
          user: userInfo.userphone,
          nickname: userInfo.name,
          password: userInfo.password,
        },
      })
        .then((res) => {
          this.$toast.clear();
          console.log(res);
          if (res.data.status == 200) {
            this.isRegister = false;
            for (var k in userInfo) {
              userInfo[k] = "";
            }
          } else {
            Notify({
              message: res.data.msg,
              color: "#fff",
              background: "#ff3b3b",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$toast.clear();
        });
    },
    login() {
      var userInfo = this.userLoginInfo;
      var o = {
        userphone: {
          value: userInfo.userphone,
          reg: /^1[3-9]\d{9}$/,
          errMsg: "手机格式不正确",
        },
        password: {
          value: userInfo.password,
          reg: /^[A-z]\w{5,17}$/,
          errMsg: "密码格式不正确",
        },
      };
      if (!vaildForm.vaild(o)) {
        return;
      }
      this.$toast.loading({
        message: "登录中......",
        forbidClick: true,
        duration: 0,
        loadingType: "spinner",
      });
      this.axios({
        method: "get",
        url: "/login",
        params: {
          user: userInfo.userphone,
          password: userInfo.password,
        },
      })
        .then((res) => {
          this.$toast.clear();
          console.log(res);
          if (res.data.status == 300) {
            localStorage.setItem("CStk", res.data.data);
            this.$router.push({ name: "Home" });
          } else {
            Notify({
              message: res.data.msg,
              color: "#fff",
              background: "#ff3b3b",
            });
          }
        })
        .catch((err) => {
          console.log(err);
          this.$toast.clear();
        });
    },
  },
};
</script>
<style lang="less">
#login {
  .van-nav-bar .van-icon {
    font-size: 22px;
    color: #333;
  }
  .van-nav-bar__title {
    color: #ff3b3b;
    // color: pink;
    font-weight: bold;
  }
  .logo_img {
    margin-top: 50px;
    margin-bottom: 30px;
  }
  .logo_img img {
    width: 115px;
    height: 115px;
    border-radius: 25px;
  }
  .logo_img .login_text {
    font-size: 22px;
    margin-top: 5px;
  }
  .login_form {
    .clearfix {
      content: "";
      display: block;
      clear: both;
    }
    .fr {
      float: right;
    }
    .forgot {
      margin-top: 15px;
      margin-right: 16px;
      span {
        color: #aaa;
      }
    }
    .login-btn {
      display: flex;
      justify-content: center;
      margin-top: 50px !important;
      margin-bottom: 20px !important;
    }
    .reg_btn {
      display: flex;
      justify-content: center;
    }
    .login-btn .userlogin {
      width: 80%;
      background-color: rgb(252, 59, 60);
      border: 0;
    }
    .reg_btn .userzc {
      width: 80%;
      background-color: #fff;
      color: black;
      border: 1px solid #f0f0f0;
    }
  }

  .popup-box {
    min-height: 200px;
    .van-cell {
      padding-top: 30px;
    }
    .register_title {
      font-size: 24px;
      font-weight: bold;
      padding: 10px 0 10px 15px;
      text-align: left;
    }
  }
}
</style>