/*
 * @Author: your name
 * @Date: 2021-06-18 10:40:32
 * @LastEditTime: 2021-06-19 12:10:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \resources\static\js\home.js
 */
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






$(".box").find("button").click(function () {
    let goodsId = $(this).attr("data");
    $.ajax({

        type:"GET",
        url:'/goods/' + goodsId,
        contentType: "application/json; charset=utf-8",

        success:function (result) {
            layer.open({
                type: 1,
                title: '商品详情页',
                area: ['1080px', '720px'],
                maxmin: true,
                offset: [($(window).height()-720),($(window).width()-1300)],
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


$(".recommend").click(function () {
    let goodsId = $(this).attr("data");
    $.ajax({

        type:"GET",
        url:'/goods/' + goodsId,
        contentType: "application/json; charset=utf-8",

        success:function (result) {
            layer.open({
                type: 1,
                title: '商品详情页',
                area: ['1080px', '720px'],
                maxmin: true,
                offset: [($(window).height()-720),($(window).width()-1300)],
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



$(function () {
    $('[js-tab=2]').tab({
        curDisplay: 1,
        changeMethod: 'horizontal'
    });

    $('[js-tab=3]').tab({
        curDisplay: 1,
        changeMethod: 'horizontal'
    });
});

var swiper = new Swiper('.swiper-container', {
    slidesPerView: 3,
    effect: 'coverflow',
    autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: true,
    },
    loop: true,
    centeredSlides: true,
    slideToClickedSlide: true,
    spaceBetween: 60,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
});



