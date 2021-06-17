/*
 * @Author: your name
 * @Date: 2021-06-15 21:47:32
 * @LastEditTime: 2021-06-17 22:49:25
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \resources\static\js\space.js
 */
//订单详情展示
const orderDetailString = `
<div>
    <ul>
        <li v-for="goodsAndNumber in order" @click="showGoodsDetail(goodsAndNumber.goodsId)">
            <p>{{goodsAndNumber.number}}</p>
            <p>{{goodsAndNumber.name}}</p>
            <p>{{goodsAndNumber.price}}</p>
            <img>
        </li>
    </ul>
<div>
    <p>{{totalPrice}}</p>
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
                        title: '订单详情',
                        area: ['560px', '560px'],
                        maxmin: true,
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