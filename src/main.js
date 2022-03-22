import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import 'lib-flexible/flexible'
import {
  NavBar,
  Button,
  Form,
  Field,
  Popup,
  Toast,
  Tabbar,
  TabbarItem,
  Search,
  Swipe,
  Icon,
  SwipeItem,
  GoodsAction, 
  GoodsActionIcon, 
  GoodsActionButton,
  Stepper,
  Tab, 
  Tabs,
  SwipeCell, 
  Card,
  Checkbox,
  CheckboxGroup,
  SubmitBar,
  Empty,
  NoticeBar,
  AddressEdit,
  AddressList,
  Area,
  Cell
} from 'vant';


Vue
  .use(Empty)
  .use(NoticeBar)
  .use(NavBar)
  .use(Button)
  .use(Form)
  .use(Field)
  .use(Popup)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(VueAxios,Axios)
  .use(Search)
  .use(Swipe)
  .use(Icon)
  .use(SwipeItem)
  .use(GoodsAction)
  .use(GoodsActionButton)
  .use(GoodsActionIcon)
  .use(Stepper)
  .use(Tab)
  .use(Tabs)
  .use(SwipeCell)
  .use(Card)
  .use(Checkbox)
  .use(CheckboxGroup)
  .use(SubmitBar)
  .use(AddressEdit)
  .use(AddressList)
  .use(Area)
  .use(Cell)

Vue.config.productionTip = false
Axios.defaults.baseURL="http://localhost:9000"

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
