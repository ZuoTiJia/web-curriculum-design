layui.use(['carousel', 'form'], function () {
    let carousel = layui.carousel,
        form = layui.form;
    //图片轮播
    carousel.render({
        elem: '#carousel',
        width: '960px',
        height: '540px',
        interval: 5000
    });
});

const detailString =
    `
    <div id="detail">
        <p>{{goodsName}}</p>
        <p>{{goodsPrice}}</p>
        <p>{{goodsBusinessPhone}}</p>
        <p>{{goodsRemnantInventory}}</p>
        <p>{{goodsType}}</p>
        <p>{{goodsDescribe}}</p>
        <button class="layui-btn layui-btn-normal">添加至购物车</button>
    </div>
    `
new Vue.component('goods-detail', {
    template: detailString
})
function GoodsAndNumber(goodsId, number, name, price) {
    this.goodsId = goodsId;
    this.number = number;
    this.name = name;
    this.price = price;
}

function showDetail() {


}

$(".showSingleGood").find("button").click(function () {
    let goodsId = $(this).attr("data");
    $.ajax({

        type:"GET",
        url:'http://localhost:8080/goods/' + goodsId,
        contentType: "application/json; charset=utf-8",

        success:function (result) {
            let goods = result;
            let goodsName = goods.name;
            let goodsPrice = goods.price;
            let goodsBusinessPhone = goods.businessPhone;
            let goodsRemnantInventory = goods.remnantInventory;
            let goodsType = goods.goodsType;
            let goodsDescribe = goods.describe;

            layer.open({
                type: 1,
                content: detail
            });
            //绑定数据
            new Vue({
                el: '#detail',
                data: {
                    goodsName: goodsName,
                    goodsPrice: goodsPrice,
                    goodsBusinessPhone: goodsBusinessPhone,
                    goodsRemnantInventory: goodsRemnantInventory,
                    goodsType: goodsType,
                    goodsDescribe: goodsDescribe
                }
            });
            function addCart(goodsId) {
                for(let i=0; i < cart.length; i++) {
                    if(cart[i].goodsId === goodsId) {
                        cart[i].number += 1;
                        return;
                    }
                }
                cart.push(new GoodsAndNumber(goodsId, 1, goodsName, goodsPrice));
            }
            $('#detail').find("button").on('click', function () {
                addCart(goodsId);
                layer.alert("添加成功");
                console.log(cart);
            });
        },
        error:function (data) {
            layer.alert(JSON.stringify(data));
        }
    })
});



