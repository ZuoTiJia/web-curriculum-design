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

            layer.open({
                type: 1,
                content: detail
            });
            //绑定数据
            new Vue({
                el: '#detail',
                data: {
                    goods: result
                }
            });
        },
        error:function (data) {
            layer.alert(JSON.stringify(data));
        }
    })
});



