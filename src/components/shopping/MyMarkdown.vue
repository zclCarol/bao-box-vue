<!--
 * @Description: 渲染markdown文件
 * @Author: hai-27
 * @Date: 2020-03-12 17:30:46
 * @LastEditors: hai-27
 * @LastEditTime: 2020-03-12 18:23:58
 -->
<template>
  <div id="my-markdown" class="markdown-body">
    <vue-markdown :source="md"></vue-markdown>
  </div>
</template>
<script>
import VueMarkdown from "vue-markdown";

export default {
  name: "MyMarkdown",
  components: {
    VueMarkdown
  },
  data() {
    return {
      md: ""
    };
  },
  created() {
    // 从后端请求README.md
    // this.$axios
    //   .get("/api/public/docs/README.md", {})
    //   .then(res => {
    //     this.md = res.data;
    //   })
    //   .catch(err => {
    //     return Promise.reject(err);
    //   });
    this.md = '# Store（参考小米商城）\r\n\r\n'+
              ' ## 项目简介 \r\n\r\n' +
              ' 项目麻雀虽小，五脏俱全。实现了电商基本业务流程，即：搜索-展示-详情-购物车-下单/下单（秒杀）-快递。\r\n\r\n'+
              ' 除此之外，我的开发愿景是希望实现一个在高并发下高性能高可用的系统，如点击XXX按钮后，可以开启高并发模式，并在前端反馈整个系统情况以及高并发处理日志等。 \r\n\r\n'+
              ' ## 特别说明 \r\n\r\n' +
              ' 项目前端样板源自github: https://github.com/hai-27/vue-store \r\n\r\n '+
              ' 因后端非JAVA开发，我对前端做了部分修改，源项目喜欢的话可以去Star支持一下！\r\n\r\n'+
              ' 项目纯属个人兴趣，无商业用途，和小米无关，若需要购买小米产品请到小米官方商城。\r\n\r\n' +
              ' ## 云服务器配置 \r\n\r\n ' + 
              ' - **操作系统：** Alibaba Cloud Linux 3.2104 LTS 64位  &nbsp;&nbsp;&nbsp; **CPU&内存：** 2核(vCPU) 4 GiB   \r\n\r\n '+
              ' - **云盘1：** ESSD Entry云盘/40GiB (2120 IOPS) &nbsp;&nbsp;&nbsp; **当前使用带宽：** 100Mbps （峰值）\r\n\r\n' +
              ' ## 技术栈 \r\n\r\n ' + 
              ' - **前端：** Vue+Vue-router+Vuex+Element-ui+Axios 等等\r\n\r\n '+
              ' - **后端：** SpringBoot+SpringCloud+SpringAlibabaCloud、XXXXX等等\r\n\r\n' +
              ' - **数据库：** Mysql \r\n\r\n'+
              ' - **第三方服务：** ali云服务器ECS+ali对象存储OSS \r\n\r\n'+
              ' ## 高并发模式 \r\n\r\n ' + 
              ' - **秒杀：** XXXXXXXXX、\r\n\r\n' +
              ' - **集群搭建：** XXXXXXXXX、\r\n\r\n' +
              ' - **XXXXX：** XXXXXX'

  }
};
</script>
<style>
@import "../../assets/github-markdown.css";
.markdown-body {
  box-sizing: border-box;
  margin: 0 auto;
  padding: 0 40px;
}
</style>