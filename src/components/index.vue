<template>
    <div class="index">
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="#/" class="router-link-active">首页</a> &gt;
                <a href="#/site/goodslist" class="router-link-exact-active router-link-active">购物商城</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper">
                <div class="wrap-box">
                    <div class="left-220" style="margin: 0px;">
                        <div class="banner-nav">
                            <ul>
                                <li v-for="(item, index) in catelist" :key="item.id">
                                    <h3>
                                        <i class="iconfont icon-arrow-right"></i>
                                        <span>{{item.title}}</span>
                                        <p>
                                            <span v-for="(itemson, i) in item.subcates" :key="itemson.id">
                                                {{itemson.title}}&nbsp;
                                            </span>
                                        </p>
                                    </h3>
                                    <div class="item-box">
                                        <dl>
                                            <dt>
                                                <a href="/goods/40.html">{{item.title}}</a>
                                            </dt>
                                            <dd>
                                                <a v-for="(itemson, i) in item.subcates" :key="itemson.id" href="/goods/43.html">{{itemson.title}}</a>
                                            </dd>
                                        </dl>
                                    </div>
                                </li>

                            </ul>
                        </div>
                    </div>
                    <!--幻灯片-->
                    <div class="left-705">
                        <el-carousel indicator-position="outside" height="341px">
                            <el-carousel-item v-for="(item, index) in sliderlist" :key="item.id">
                            <img :src="item.img_url" :alt="item.title">
                            </el-carousel-item>
                        </el-carousel>
                    </div>
                    <!--/幻灯片-->
                    <div class="left-220">
                        <ul class="side-img-list">
                            <li v-for="(item, index) in toplist" :key="item.id">
                                <div class="img-box">
                                    <label>{{index+1}}</label>
                                    <img :src="item.img_url">
                                </div>
                                <div class="txt-box">
                                    <a href="/goods/show-98.html">{{item.title}}</a>
                                    <span>{{item.add_time | cut}}</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        <div class="section" v-for="(item, index) in goodList" :key="item.level1cateid">
            <div class="main-tit">
                <h2>{{item.catetitle}}</h2>
                <p>
                    <a v-for="(itemson, i) in item.level2catelist" href="/goods/43.html">{{itemson.subcatetitle}}</a>
                    <a href="/goods/40.html">更多
                        <i>+</i>
                    </a>
                </p>
            </div>
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <ul class="img-list">
                        <li v-for="(itemson, i) in item.datas" :key="itemson.artID">
                            <a href="#/site/goodsinfo/87" class="">
                                <div class="img-box">
                                    <img v-lazy="itemson.img_url">
                                </div>
                                <div class="info">
                                    <h3>{{itemson.artTitle}}</h3>
                                    <p class="price">
                                        <b>{{itemson.sell_price}}</b>元</p>
                                    <p>
                                        <strong>库存 {{itemson.stock_quantity}}</strong>
                                        <span>市场价：
                                            <s>{{itemson.market_price}}</s>
                                        </span>
                                    </p>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import axios from 'axios';

    export default{
        data:function(){
            return{
                catelist:[],
                sliderlist:[],
                toplist:[],
                goodList:[]
            }
        },
        mounted() {
            // 头部导航数据
            axios.get('http://47.106.148.205:8899/site/goods/gettopdata/goods')
            .then((response)=> {
                // console.log(response);
                this.catelist=response.data.message.catelist;
                this.sliderlist=response.data.message.sliderlist;
                this.toplist=response.data.message.toplist;
            })
            .catch( (error)=> {
                console.log(error);
            })
            // 底部商品列表
            axios.get('http://47.106.148.205:8899/site/goods/getgoodsgroup')
            .then((response)=> {
                // console.log(response);
                this.goodList=response.data.message;
            })
            .catch( (error)=> {
                console.log(error);
            })
        },
        filters:{
            cut:function(value){
                return value.slice(0,10);
            }
        }
    };
</script>

<style scoped>
    .el-carousel img {
        width: 100%;
        height: 341px;
    }
</style>