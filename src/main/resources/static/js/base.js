
//初始化购物车
let cart;
cart = localStorage.getItem("cart");
if(cart == null || cart == "null") {
    cart = new Array();
} else {
    cart = JSON.parse(cart);
}
console.log(JSON.stringify(cart));

//退出存储购物车
function exitAndSave(e) {
    localStorage.setItem("cart", JSON.stringify(cart));
}
window.onunload = exitAndSave;
window.onbeforeunload = exitAndSave;

//获取总计价格
function getAllPrice() {
    let res = 0;
    for(let i = 0; i < cart.length; i++) {
        res += cart[i].number * cart[i].price;
    }
    return res;
}

//添加至购物车
function addCart(goods) {
    for(let i=0; i < cart.length; i++) {
        if(cart[i].goodsId === goods.id) {
            cart[i].number += 1;
            return;
        }
    }
    cart.push(new GoodsAndNumber(goods.id, 1, goods.name, goods.price));
}

//获取cookie中存的电话号
function getPhone() {
    let phone =  $.cookie("phone");

    if(phone == 0 || phone === undefined) {
        layer.open({
            type: 1,
            content: `
            <p>登陆过期 请重新登陆</p>
            <button class="layui-btn layui-btn-normal" onclick="window.location.replace('login')">确认</button>
            `
        })
    } else {
        return Number(phone);
    }
}
//购物车组件
cartString =
    `
    <div>
    <div class="single-goods" v-for="(goodsAndNumber, index) in cart" >
    <p>{{goodsAndNumber.number}}</p>
    <p>{{goodsAndNumber.name}}  </p>
    <p>{{goodsAndNumber.price}}</p>
    <img :src="'/image/' + goodsAndNumber.goodsId">
    <button type="button" class="layui-btn layui-btn-normal" @click="subNumber(index)">减少</button>
    <button type="button" class="layui-btn layui-btn-normal" @click="addNumber(index)">增加</button>
    </div>
    
    <div>
    <p>{{allPrice}}</p>
    </div>
    <div>
    <button type="button" class="layui-btn-normal layui-btn" @click="commit()"></button>
    </div>
    </div>
    `

Vue.component('cart', {
    template:cartString,
    data: function () {
        return {
            cart: cart,
        }
    },
    computed: {
        allPrice: getAllPrice
    },
    methods: {
        //减少单件商品数量
        subNumber: function (index) {

            if(cart[index].number == 1) {
                cart[index].splice(index, 1);
            }
            cart[index].number -= 1;
        },
        //添加单件商品数量
        addNumber: function (index) {
            cart[index].number += 1;
        },
        //最终提交
        commit: function () {
                layer.open({
                    type:1,
                    content:'<div id="confirm"><confirm></confirm></div>'
                })
                let confirmVue = new Vue({
                    el:"#confirm"
                });
            }
    }
})



//导航栏 组件
const navStr =
`
<div>
<ul class="layui-nav" lay-filter=""  >
    <li class="layui-nav-item">
        <div class="layui-anim layui-anim-scaleSpring" >
            <span title="这是首页">
                <a href="/"><i class="layui-icon layui-icon-home"></i>首页</a>
            </span>
        </div>
    </li>
    <li class="layui-nav-item">
        <span title="这是购物车">
            <a @click="showCart()"><i class="layui-icon layui-icon-cart layui-anim" data-anim="layui-anim-downbit"></i>购物车</a>
        </span>
    </li>

    <li class="layui-nav-item">
        <span title="这是个人中心，可以查看订单">
            <a @click="space();return 0;"><i class="layui-icon layui-icon-username"></i>个人中心</a>
        </span>
    </li>
    <li class="layui-nav-item">
    <a @click="space()"><img src="https://t.cn/RCzsdCq" class="layui-nav-img">我</a>
    <dl class="layui-nav-child">
<!--      <dd><a href="javascript:;">修改信息</a></dd>-->
      <dd><a @click="logout()">退出登录</a></dd>
    </dl>
  </li>
</ul>
</div>
`;

Vue.component('nav-component', {
    template: navStr,
    methods: {
        //进入个人空间
        space: function () {
            let phone = getPhone();
            window.location.replace('/user/' + phone);
        },
        //展示购物车
        showCart: function () {
                layer.open({
                    type: 1,
                    content: `<div id="cart"><cart></cart></div>`
                })
                let cartVue = new Vue({el: "#cart"});
            },

        //退出登录
        logout:function logout() {
            $.ajax({
                type:"GET",
                url:'/userLogout',
                success:function (result) {
                    alert(result);
                    if(result === "false") {
                        alert("注册失败, 已存在该用户");
                    } else {
                        window.location = "/login";
                    }
                },
                error:function (data) {
                    alert(JSON.stringify(data));
                }
            })
        }

    }
})

//商品详情组件
const detailString =
    `
    <div id="detail">
        <p>{{goods.name}}</p>
        <p>{{goods.price}}</p>
        <p>{{goods.businessPhone}}</p>
        <p>{{goods.remnantInventory}}</p>
        <p>{{goods.goodsType}}</p>
        <p>{{goods.describe}}</p>
        <button class="layui-btn layui-btn-normal" @click="addCart(goods)">添加至购物车</button>
    </div>
    `
Vue.component('goods-detail', {
    template: detailString,
    methods: {
        addCart:function (goodsId) {
            addCart(goodsId);
            layer.alert("添加成功");
        }
    }
})

//支付确组件
const confirmStr =
    `
     <div>
     <p>allPrice:{{allPrice}}</p>
     <button class="layui-btn layui-btn-normal" @click="commitOrder()">支付并确认</button>
     </div>
    `;

Vue.component("confirm", {
    template: confirmStr,
    data: function () {
        return {
            allPrice: getAllPrice()
        }
    },
    methods: {
        commitOrder:function () {
            let order = {
                customPhone: getPhone(),
                goodsNumbers: new Array(),
                totalPrice: getAllPrice()
            };

            for(let i = 0; i < cart.length; i++) {
                order.goodsNumbers.push({
                    goodsId: cart[i].goodsId,
                    number: cart[i].number
                })
            }


            $.ajax({
                url:'/orderAdd',
                type: "POST",
                contentType: "application/json; charset=utf-8",
                data: JSON.stringify(order),
                success: function (result) {
                    cart.splice(0, cart.length);
                    layer.alert("success");
                }
            })
        }
    }
})
new Vue({el:'#nav'});



























