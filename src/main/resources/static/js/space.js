const orderDetailString = `

<div>
    <ul>
        <li v-for="goodsAndNumber in order" @click="showOrderDetail()">
            <p>{{goodsAndNumber.number}}</p>
            <p>{{goodsAndNumber.name}}</p>
            <p>{{goodsAndNumber.price}}</p>
        </li>
    </ul>
<div>
    <p>{{allPrice}}</p>
</div>
</div>

`
Vue.component('order-detail', {
    template: orderDetailString,
    props:['goodsAndNumber', 'allPrice'],
    methods: {

    }



})

$(".showSingleOrder").click(function () {
    let orderId = $(this).attr("data");
    $.ajax({
        type: "GET",
        url: '/order/' + orderId,
        contentType: "application/json; charset=utf-8",

        success: function (result) {
            layer.open({
                type: 1,
                content: '<div id="order-detail"><order-detail></order-detail></div>'
            })
            new Vue({
                el:'#order-detail',
                data: {
                    goodsName:result
                }
            })

        }

    })
})