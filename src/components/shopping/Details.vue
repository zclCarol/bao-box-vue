<!--
 * @Description: 商品详情页面组件
 * @Author: hai-27
 * @Date: 2020-02-16 20:20:26
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-07 21:59:26
 -->
<template>
  <div id="details">
    <!-- 头部 -->
    <div class="page-header">
      <div class="title">
        <p>{{item.productName}}</p>
        <div class="list">
          <ul>
            <li>
              <router-link to>概述</router-link>
            </li>
            <li>
              <router-link to>产品参数(未开发)</router-link>
            </li>
            <li>
              <router-link to>用户评价(未开发)</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <!-- 头部END -->

    <!-- 主要内容 -->
    <div class="main">
      <!-- 左侧商品轮播图 -->
      <div class="block">
        <el-carousel height="560px" v-if="carouselDetail.length>1">
          <el-carousel-item v-for="thePic in carouselDetail" :key="thePic.carousel_id">
            <img style="height:560px;" :src="thePic.imgPath" :alt="thePic.describes" />
          </el-carousel-item>
        </el-carousel>
        <!-- <div v-if="carouselDetail.length==1">
          <img
            style="height:560px;"
            :src="$target + productPicture[0].product_picture"
            :alt="productPicture[0].intro"
          />
        </div> -->
      </div>
      <!-- 左侧商品轮播图END -->

      <!-- 右侧内容区 -->
      <div class="content">
        <h1 class="name">{{item.productName}}</h1>
        <p class="intro">{{item.productIntro}}</p>
        <p class="store">小米自营</p>
        <div class="price">
          <span>{{item.productSellingPrice}}元</span>
          <span
            v-show="item.productPrice != item.productSellingPrice"
            class="del"
          >{{item.productPrice}}元</span>
        </div>
        <div class="pro-list">
          <span class="pro-name">{{item.productName}}</span>
          <span class="pro-price">
            <span>{{item.productSellingPrice}}元</span>
            <span
              v-show="item.productPrice != item.productSellingPrice"
              class="pro-del"
            >{{item.productPrice}}元</span>
          </span>
          <p class="price-sum">总计 : {{item.productSellingPrice}}元</p>
        </div>
        <!-- 内容区底部按钮 -->
        <div class="button">
          <el-button class="shop-cart" :disabled="dis" @click="addShoppingCart">加入购物车</el-button>
          <el-button class="like" @click="addCollect" disabled>收藏(未开发)</el-button>
        </div>
        <!-- 内容区底部按钮END -->
        <div class="pro-policy">
          <ul>
            <li>
              <i class="el-icon-circle-check"></i> 小米自营
            </li>
            <li>
              <i class="el-icon-circle-check"></i> 小米发货
            </li>
            <li>
              <i class="el-icon-circle-check"></i> 7天无理由退货
            </li>
            <li>
              <i class="el-icon-circle-check"></i> 7天价格保护
            </li>
          </ul>
        </div>
      </div>
      <!-- 右侧内容区END -->
    </div>
    <!-- 主要内容END -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
import baoHttp from '@/utils/ajax'

export default {
  name: 'Details',
  props: ["item"],
  data() {
    return {
      dis: false, // 控制“加入购物车按钮是否可用”
      productID: "", // 商品id
      productDetails: "", // 商品详细信息
      productPicture: "", // 商品图片
      carouselDetail: "" // 偷懒写死的轮播图片
    };
  },
  // 通过路由获取商品id
  activated() {
    if (this.$route.query.productID != undefined) {
      this.productID = this.$route.query.productID;
    }
  },
  mounted(){
    let carouselList = [
      {carousel_id:1,describes:'123456',
      imgPath:'https://baozheni.oss-cn-shanghai.aliyuncs.com/bao-store/phone/Redmi-k30.png'},
      {carousel_id:2,describes:'123456',
      imgPath:'https://baozheni.oss-cn-shanghai.aliyuncs.com/bao-store/phone/Redmi-k30-5G.png'},
      {carousel_id:3,describes:'123456',
      imgPath:'https://baozheni.oss-cn-shanghai.aliyuncs.com/bao-store/phone/Redmi-8.png'},
    ]
    this.carouselDetail = carouselList;
  },
  watch: {
    // 监听商品id的变化，请求后端获取商品数据
    productID: function(val) {
      this.getDetailsPicture(val);
    }
  },
  methods: {
    ...mapActions(["unshiftShoppingCart", "addShoppingCartNum"]),
    // 获取商品详细信息
    getDetails(val) {
      this.$axios
        .post("/api/product/getDetails", {
          productID: val
        })
        .then(res => {
          this.productDetails = res.data.Product[0];
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    // 获取商品图片
    getDetailsPicture(val) {
      this.$axios
        .post("/api/product/getDetailsPicture", {
          productID: val
        })
        .then(res => {
          this.productPicture = res.data.ProductPicture;
        })
        .catch(err => {
          return Promise.reject(err);
        });
    },
    // 加入购物车
    addShoppingCart() {
      // 判断是否登录,没有登录则显示登录组件
      // if (!this.$store.getters.getUser) {
      //   this.$store.dispatch("setShowLogin", true);
      //   return;
      // }
      //封装一个购物车
      let userNo = this.$store.getters.getUser.no
      let cart = {
        no: userNo,
        productId: this.item.productId,
        num: 1
      }
      // console.log(userNo)
      // console.log(this.item)
      baoHttp.ajax.call(this, '/product/addShoppingCart', cart, (data, err) => {
        if (!err) {
          let newShoppingCart = data.data
          if(newShoppingCart.num == 1){
              let a = {
                id: newShoppingCart.id,
                num: newShoppingCart.num,
                price: newShoppingCart.productSellingPrice,
                productID: newShoppingCart.productId,
                productName: newShoppingCart.productName,
                productIm: newShoppingCart.productPicture,
                check: false
              }
              this.unshiftShoppingCart(a)
          }else{
            this.addShoppingCartNum(newShoppingCart.productId);
          }
          this.$alert(
            '提示',
            {
              title: '操作成功',
              message: '加入成功，若购物车内已存在该商品，则数量+1',
              confirmButtonText: '确定',
              type: 'success'
            }
          )
          
        }
      })

            //   this.unshiftShoppingCart(res.data.shoppingCartData[0]);
            //   this.notifySucceed(res.data.msg);
            //   break;
            // case "002":
            //   // 该商品已经在购物车，数量+1
            //   this.addShoppingCartNum(this.productID);
    },
    addCollect() {
      // 判断是否登录,没有登录则显示登录组件
      if (!this.$store.getters.getUser) {
        this.$store.dispatch("setShowLogin", true);
        return;
      }
      this.$axios
        .post("/api/user/collect/addCollect", {
          user_id: this.$store.getters.getUser.user_id,
          product_id: this.productID
        })
        .then(res => {
          if (res.data.code == "001") {
            // 添加收藏成功
            this.notifySucceed(res.data.msg);
          } else {
            // 添加收藏失败
            this.notifyError(res.data.msg);
          }
        })
        .catch(err => {
          return Promise.reject(err);
        });
    }
  }
};
</script>
<style>
/* 头部CSS */
#details .page-header {
  height: 64px;
  margin-top: -20px;
  z-index: 4;
  background: #fff;
  border-bottom: 1px solid #e0e0e0;
  -webkit-box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
}
#details .page-header .title {
  width: 1225px;
  height: 64px;
  line-height: 64px;
  font-size: 18px;
  font-weight: 400;
  color: #212121;
  margin: 0 auto;
}
#details .page-header .title p {
  float: left;
}
#details .page-header .title .list {
  height: 64px;
  float: right;
}
#details .page-header .title .list li {
  float: left;
  margin-left: 20px;
}
#details .page-header .title .list li a {
  font-size: 14px;
  color: #616161;
}
#details .page-header .title .list li a:hover {
  font-size: 14px;
  color: #ff6700;
}
/* 头部CSS END */

/* 主要内容CSS */
#details .main {
  width: 1225px;
  height: 560px;
  padding-top: 30px;
  margin: 0 auto;
}
#details .main .block {
  float: left;
  width: 560px;
  height: 560px;
}
#details .el-carousel .el-carousel__indicator .el-carousel__button {
  background-color: rgba(163, 163, 163, 0.8);
}
#details .main .content {
  float: left;
  margin-left: 25px;
  width: 640px;
}
#details .main .content .name {
  height: 30px;
  line-height: 30px;
  font-size: 24px;
  font-weight: normal;
  color: #212121;
}
#details .main .content .intro {
  color: #b0b0b0;
  padding-top: 10px;
}
#details .main .content .store {
  color: #ff6700;
  padding-top: 10px;
}
#details .main .content .price {
  display: block;
  font-size: 18px;
  color: #ff6700;
  border-bottom: 1px solid #e0e0e0;
  padding: 25px 0 25px;
}
#details .main .content .price .del {
  font-size: 14px;
  margin-left: 10px;
  color: #b0b0b0;
  text-decoration: line-through;
}
#details .main .content .pro-list {
  background: #f9f9fa;
  padding: 30px 60px;
  margin: 50px 0 50px;
}
#details .main .content .pro-list span {
  line-height: 30px;
  color: #616161;
}
#details .main .content .pro-list .pro-price {
  float: right;
}
#details .main .content .pro-list .pro-price .pro-del {
  margin-left: 10px;
  text-decoration: line-through;
}
#details .main .content .pro-list .price-sum {
  color: #ff6700;
  font-size: 24px;
  padding-top: 20px;
}
#details .main .content .button {
  height: 55px;
  margin: 10px 0 20px 0;
}
#details .main .content .button .el-button {
  float: left;
  height: 55px;
  font-size: 16px;
  color: #fff;
  border: none;
  text-align: center;
}
#details .main .content .button .shop-cart {
  width: 340px;
  background-color: #ff6700;
}
#details .main .content .button .shop-cart:hover {
  background-color: #f25807;
}

#details .main .content .button .like {
  width: 260px;
  margin-left: 40px;
  background-color: #b0b0b0;
}
#details .main .content .button .like:hover {
  background-color: #757575;
}
#details .main .content .pro-policy li {
  float: left;
  margin-right: 20px;
  color: #b0b0b0;
}
/* 主要内容CSS END */
</style>