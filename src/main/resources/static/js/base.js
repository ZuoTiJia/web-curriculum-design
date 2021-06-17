
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
function GoodsAndNumber(goodsId, number, name, price) {
    this.goodsId = goodsId;
    this.number = number;
    this.name = name;
    this.price = price;
}
//购物车组件
//购物车组件
const cartString =
    `
    <div>
        <div>
            <div class="single-goods" v-for="(goodsAndNumber, index) in cart" style="text-align:center">
                <img :src="'/image/' + goodsAndNumber.goodsId" style="width:288px; height: 224px;float: left;">
                <div class="table1" style="width: 400px;height:224px;text-align: center;float: left;">
                    <div class="div1" style="height:33%">商品数量:</div>
                    <div class="div2" style="height:33%">{{goodsAndNumber.number}}</div>
                    <div class="div1" style="height:33%">商品名称:</div>
                    <div class="div2" style="height:33%">{{goodsAndNumber.name}}</div>
                    <div class="div1" style="height:33%">商品价格:</div>
                    <div class="div2" style="height:33%">{{goodsAndNumber.price}}</div>
                </div>
                <div style="height: 224px;width: auto;">
                    <button type="button" class="layui-btn layui-btn-normal" @click="subNumber(index)" >减少</button>
                    <button type="button" class="layui-btn layui-btn-normal" @click="addNumber(index)" >增加</button>
                </div>
                <br>
                <div style="width: 100%;height: 2px;background: black;overflow: hidden;"></div>
                <br>
            </div>
        </div>
        <div style="height:100px;text-align:center">
            <p>总价格为:{{allPrice}}</p>
        </div>
        <div style="height:100px;text-align:center">
            <button type="button" class="layui-btn-normal layui-btn" @click="commit()">点击付款</button>
        </div>
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
                title: '结算界面',
                area: ['560px', '560px'],
                maxmin: true,
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
            if(phone) {
                window.location.replace('/user/' + phone);
            }

        },
        //展示购物车
        showCart: function () {
            layer.open({
                type: 1,
                title: '购物车界面',
                area: ['1080px', '560px'],
                maxmin: true,
                offset: [($(window).height()-720),($(window).width()-1300)],
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
    <div id="detail" style="text-align:center">
        <img :src="'/image/' + goods.id" style="width:720px; height: 560px;text-align: center;float: left;">
        <div style="width: 300px;height:560px; text-align: center;float: left;" class="table1">
            
                <div class="div1">商品名称:</div>
                <div class="div2">{{goods.name}}</div>
                <div class="div1">商品价格:</div>
                <div class="div2">{{goods.price}}</div>
                <div class="div1">商家电话:</div>
                <div class="div2">{{goods.businessPhone}}</div>
                <div class="div1">商品库存:</div>
                <div class="div2">{{goods.remnantInventory}}</div>
                <div class="div1">商品类型:</div>
                <div class="div2">{{goods.goodsType}}</div>
                <div class="div1" style="height: 25%;">详细描述:</div>
                <div class="div2" style="height: 25%;">{{goods.describe}}</div>
                <div style="float:left;height:12.5%;width:100%;text-align: center;">
                    <button class="layui-btn layui-btn-normal" @click="addCart(goods)" style="margin-top:30px" >添加至购物车</button>
                </div>
        </div>
    </div>
    `;

Vue.component('goods-detail', {
    template: detailString,
    props:['goods'],
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
     <div style="text-align:center">
     <h2>您共需要支付:{{allPrice}}</h2>
     <br>
     <br>
     <div style="height: 320px;width: 320px;margin:0 auto">
     <img src="/picture/二维码.jpg">
     <br>
     </div>
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



























