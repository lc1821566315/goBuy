<template>
    <div>
        <div class="section">
            <div class="location">
                <span>当前位置：</span>
                <a href="/index.html">首页</a> &gt;
                <a href="/goods.html">购物商城</a> &gt;
                <a href="/goods/42/1.html">商品详情</a>
            </div>
        </div>
        <div class="section">
            <div class="wrapper clearfix">
                <div class="wrap-box">
                    <div class="left-925">
                        <div class="goods-box clearfix">
                            <div v-if="this.imglist.length!=0" class="pic-box">
                                <ProductZoomer :baseImages="images" :base-zoomer-options="zoomerOptions">
                                </ProductZoomer>
                            </div>
                            <div class="goods-spec">
                                <h1>{{goodsinfo.title}}</h1>
                                <p class="subtitle">{{goodsinfo.sub_title}}</p>
                                <div class="spec-box">
                                    <dl>
                                        <dt>货号</dt>
                                        <dd id="commodityGoodsNo">{{goodsinfo.goods_no}}</dd>
                                    </dl>
                                    <dl>
                                        <dt>市场价</dt>
                                        <dd>
                                            <s id="commodityMarketPrice">¥{{goodsinfo.market_price}}</s>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dt>销售价</dt>
                                        <dd>
                                            <em id="commoditySellPrice" class="price">¥{{goodsinfo.sell_price}}</em>
                                        </dd>
                                    </dl>
                                </div>
                                <div class="spec-box">
                                    <dl>
                                        <dt>购买数量</dt>
                                        <dd>
                                            <div class="stock-box">
                                                <div class="el-input-number el-input-number--small">
                                                    <span role="button" class="el-input-number__decrease" :class="{'is-disabled':buynum==1}">
                                                        <i @click="buynum==1?1:buynum--" class="el-icon-minus"></i>
                                                    </span>
                                                    <span role="button" class="el-input-number__increase" :class="{'is-disabled':buynum==goodsinfo.stock_quantity}">
                                                        <i @click="buynum<goodsinfo.stock_quantity?buynum++:goodsinfo.stock_quantity" class="el-icon-plus"></i>
                                                    </span>
                                                    <div class="el-input el-input--small">
                                                        <!---->
                                                        <input v-model="buynum" autocomplete="off" size="small" type="text" rows="2" max="60" min="1" validateevent="true" class="el-input__inner" role="spinbutton" aria-valuemax="60" aria-valuemin="1" aria-valuenow="1" aria-disabled="false">
                                                        <!---->
                                                        <!---->
                                                        <!---->
                                                    </div>
                                                </div>
                                            </div>
                                            <span class="stock-txt">
                                                库存
                                                <em id="commodityStockNum">60</em>件
                                            </span>
                                        </dd>
                                    </dl>
                                    <dl>
                                        <dd>
                                            <div id="buyButton" class="btn-buy">
                                                <button onclick="cartAdd(this,'/',1,'/shopping.html');" class="buy">立即购买</button>
                                                <button @click="cartAdd" class="add">加入购物车</button>
                                            </div>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                        <div id="goodsTabs" class="goods-tab bg-wrap">
                            <Affix>
                            <div id="tabHead" class="tab-head" style="position: static; top: 517px; width: 925px;">
                                <ul>
                                    <li>
                                        <a @click="isshow=true" href="javascript:;" :class="{selected:isshow}">商品介绍</a>
                                    </li>
                                    <li>
                                        <a @click="isshow=false" href="javascript:;" :class="{selected:!isshow}">商品评论</a>
                                    </li>
                                </ul>
                            </div>
                            </Affix>
                            <div v-html="goodsinfo.content" class="tab-content entry" :style="{display: isshow?'block':'none'}">

                            </div>
                            <div class="tab-content" :style="{display: !isshow?'block':'none'}">
                                <div class="comment-box">
                                    <div id="commentForm" name="commentForm" class="form-box">
                                        <div class="avatar-box">
                                            <i class="iconfont icon-user-full"></i>
                                        </div>
                                        <div class="conn-box">
                                            <div class="editor">
                                                <textarea v-model.trim="commentCotent" id="txtContent" name="txtContent" sucmsg=" " datatype="*10-1000" nullmsg="请填写评论内容！"></textarea>
                                                <span class="Validform_checktip"></span>
                                            </div>
                                            <div class="subcon">
                                                <input id="btnSubmit" @click="error" name="submit" type="submit" value="提交评论" class="submit">
                                                <span class="Validform_checktip"></span>
                                            </div>
                                        </div>
                                    </div>
                                    <ul id="commentList" class="list-box">
                                        <p v-if="messageList.length==0" style="margin: 5px 0px 15px 69px; line-height: 42px; text-align: center; border: 1px solid rgb(247, 247, 247);">暂无评论，快来抢沙发吧！</p>
                                        <li v-for="(item, index) in messageList">
                                            <div class="avatar-box">
                                                <i class="iconfont icon-user-full"></i>
                                            </div>
                                            <div class="inner-box">
                                                <div class="info">
                                                    <span>{{item.user_name}}</span>
                                                    <span>{{item.add_time}}</span>
                                                </div>
                                                <p>{{item.content}}</p>
                                            </div>
                                        </li>

                                    </ul>
                                    <div class="page-box" style="margin: 5px 0px 0px 62px;">
                                        <Page :total="totalCount" :page-size="pageSize" @on-change="onChange($event)"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="left-220">
                        <div class="bg-wrap nobg">
                            <div class="sidebar-box">
                                <h4>推荐商品</h4>
                                <ul class="side-img-list">
                                    <li v-for="(item, index) in hotgoodslist" :key="item.id">
                                        <div class="img-box">
                                    <router-link :to="'/goodsInfo/'+item.id">
                                        <img :src="item.img_url">
                                    </router-link>
                                        </div>
                                        <div class="txt-box">
                                            <router-link :to="'/goodsInfo/'+item.id">{{item.title}}</router-link>
                                            <span>{{item.add_time | cut}}</span>
                                        </div>
                                    </li>
                                </ul>
                                <BackTop></BackTop>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
// 导入放大镜组件
import ProductZoomer from 'vue-product-zoomer';

    export default{
        data:function(){
            return{
                goodsinfo:{},
                imglist:[],
                hotgoodslist:[],
                isshow:true,
                // 购买数量
                buynum:1,
                // 轮播图数据
                images:{
                    normal_size: []
                },
                // 轮播图的配置
                zoomerOptions:{
                    'zoomFactor': 3,
                    'pane': 'container',
                    'hoverDelay': 100,
                    'namespace': 'container-zoomer',
                    'move_by_click':true,
                    'scroll_items': 4,
                    'choosed_thumb_border_color': "#ff3d00"
                },
                pageIndex:1,
                pageSize:5,
                // 评论数据
                messageList:[],
                // 总条数
                totalCount:0,
                // 输入评论内容
                commentCotent:'',
            }
        },
        methods:{
            // 获取商品详情
            getgoodsinfo(){
                // 强制清空大图
                this.imglist=[];
                this.images.normal_size=[];
            axios.get(`http://47.106.148.205:8899/site/goods/getgoodsinfo/${this.$route.params.id}`)
            .then((response)=> {
            // console.log(response);
            this.goodsinfo=response.data.message.goodsinfo;
            this.imglist=response.data.message.imglist;
            this.hotgoodslist=response.data.message.hotgoodslist;
            // 赋值到images中
            this.imglist.forEach((v, i) => {
            this.images.normal_size.push({
              id: v.id,
              url: v.original_path
            });
          });
        })
        .catch( (error)=> {
            console.log(error);
        });
        },
        // 获取评论
        getcomment(){
            // 商品id -> this.$route.params.id
            axios.get(`http://47.106.148.205:8899/site/comment/getbypage/goods/${this.$route.params.id}?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}`)
            .then((response)=>{
                // console.log(response);
                this.messageList=response.data.message;
                this.totalCount=response.data.totalcount;
            })
            .catch((error)=>{
                console.log(error); 
            });
        },
            // 错误弹框提示
            error () {
                if(this.commentCotent==''){
                    this.$Message.error('请正确输入!');
                    return;
                } 
                // 发表评论
                axios.post(`http://47.106.148.205:8899/site/validate/comment/post/goods/${this.$route.params.id}`,{
                    commenttxt:this.commentCotent
                })
                .then((response)=>{
                    // console.log(response);
                    if(response.data.status==0){
                        this.$Message.success('评论发表成功!');
                        this.getcomment();
                        // 去第一页
                        this.pageIndex=1;
                    }
                })
                .catch((error)=>{
                    console.log(error); 
                });
                      // 清空评论
                    this.commentCotent='';
            },
            cartAdd(){
                this.$store.commit('increment',{
                goodId:this.$route.params.id, // 商品id
                goodNum:this.buynum           // 购买的数量
        });
            },
            // 页码改变
            onChange(page){
                this.pageIndex = page;
                // 重新获取数据
                this.getcomment();
            },  
        },
        mounted(){
            this.getgoodsinfo();
            this.getcomment();
        },
        watch:{
            '$route' (to, from) {
            // 对路由变化作出响应...
            // console.log('我变了')
            this.getgoodsinfo();
            this.getcomment();
        }
        },
        filters:{
            cut:function(value){
                return value.slice(0,10);
            }
        },
        // 注册放大镜
          components: {
            ProductZoomer
        }
    }
</script>

<style scoped>
/* 导入图标样式*/
    .container-zoomer-zoomer-box {
         width: 368px;
}
    .thumb-list img{
        height: 78px;
        width: 78px;
        margin: 5px;
        }
    @import url('../../node_modules/font-awesome/css/font-awesome.min.css') 
</style>