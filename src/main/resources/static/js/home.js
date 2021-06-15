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






$(".showSingleGood").find("button").click(function () {
    let goodsId = $(this).attr("data");
    $.ajax({

        type:"GET",
        url:'/goods/' + goodsId,
        contentType: "application/json; charset=utf-8",

        success:function (result) {
            layer.open({
                type: 1,
                content:'<div id="detail"><goods-detail v-bind:goods="goods"></goods-detail></div>'
            });
            //绑定数据
            new Vue({
                el: '#detail',
                data: {
                    goods:result
                }
            });
        },
        error:function (data) {
            layer.alert(JSON.stringify(data));
        }
    })
});



