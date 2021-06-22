/*
 * @Author: your name
 * @Date: 2021-06-15 21:47:32
 * @LastEditTime: 2021-06-19 11:29:49
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \resources\static\js\space.js
 */
//订单详情展示
const orderDetailString = `
<div style="text-align:center;background-image: url(/picture/bgfororderdetail.jpg);width: 560px;height: 800px;;margin: 0;">
<br>
<div class="tab" v-for="goodsAndNumber in order" @click="showGoodsDetail(goodsAndNumber.goodsId)" style="margin-top: 10px;">
    <div>
        <div style="width: 100%;text-align: left;">商品名称:{{goodsAndNumber.name}}</div>
        <div style="width: 100%;text-align: left;">购买数量:{{goodsAndNumber.number}}</div>
        <div style="width: 100%;text-align: left;">商品单价:{{goodsAndNumber.price | numFilter}}￥</div>
    </div>
</div>
<div>
    <br>
    <br>
    <h2>订单总金额为：{{totalPrice | numFilter}}￥</h2>
</div>
</div>
`
Vue.component('order-detail', {
    template: orderDetailString,
    props:['order', 'total-price'],
    methods: {
        showGoodsDetail:function (goodsId) {
            $.ajax({
                type: "GET",
                url: '/goods/' + goodsId,
                contentType: "application/json; charset=utf-8",

                success: function (result) {
                    layer.open({
                        type: 1,
                        title: '商品详情页',
                        area: ['1080px', '720px'],
                        maxmin: true,
                        offset: [($(window).height()-720),($(window).width()-1300)],
                        content: '<div id="detail"><goods-detail v-bind:goods="goods"></div>'
                    });
                    new Vue({
                        el: '#detail',
                        data: {
                            goods:result
                        }
                    })
                }

            })
        }
    },
    filters: {
        numFilter(value) {
            return parseFloat(value).toFixed(2)
        }
    }
})

$(".showSingleOrder").click(function () {
    let orderId = $(this).attr("data-id");
    let totalPrice = $(this).attr("data-totalPrice");
    $.ajax({
        type: "GET",
        url: '/record/' + orderId,
        contentType: "application/json; charset=utf-8",

        success: function (result) {
            layer.open({
                type: 1,
                title: '订单详情',
                area: ['560px', '560px'],
                maxmin: true,
                content: '<div id="order-detail"><order-detail v-bind:order="order" v-bind:total-price="totalPrice"></order-detail></div>'
            })
            new Vue({
                el:'#order-detail',
                data: {
                    order:result,
                    totalPrice: totalPrice
                }
            })

        }
    })
})