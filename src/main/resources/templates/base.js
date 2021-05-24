const navStr =
`<ul class="layui-nav" lay-filter="" v-if="true">
    <li class="layui-nav-item">
        <div class="layui-anim layui-anim-scaleSpring" id="home">
            <span v-bind:title="message">
                <a href=""><i class="layui-icon layui-icon-home"></i>首页</a>
            </span>
        </div>
    </li>
    <li class="layui-nav-item ">
        <div id="classification">
            <span v-bind:title="message">
                <p><i class="layui-icon layui-icon-spread-left"></i>分类</p>
            </span>
        </div>
        <dl class="layui-nav-child">
            <dd><a href="">书</a></dd>
            <dd><a href="">日常用品</a></dd>
            <dd><a href="">食物</a></dd>
            <dd><a href="">服装</a></dd>
            <dd><a href="">电子产品</a></dd>
        </dl>
    </li>

    <li class="layui-nav-item">
        <div id="shopping-cart">
            <span v-bind:title="message">
                <a href=""><i class="layui-icon layui-icon-cart"></i>购物车</a>
            </span>
        </div>
    </li>

    <li class="layui-nav-item">
        <div id="spance">
            <span v-bind:title="message">
                <a href=""><i class="layui-icon layui-icon-username"></i>个人中心</a>
            </span>
        </div>
    </li>
    <li class="layui-nav-item">
    <a href=""><img src="//t.cn/RCzsdCq" class="layui-nav-img">我</a>
    <dl class="layui-nav-child">
      <dd><a href="javascript:;">修改信息</a></dd>
      <dd><a onclick="">退出登录</a></dd>
    </dl>
  </li>
</ul>
`
$('#nav').prepend(navStr);
function logout() {
    $.ajax({

        type:"GET",
        url:'http://localhost:8080/userLogout',

        success:function (result) {
            alert(result);
            if(result === "false") {
                alert("注册失败, 已存在该用户");
            } else {
                window.location = "http://localhost:8080/login";
            }

        },
        error:function (data) {
            alert(JSON.stringify(data));
        }
    })

}

// let nav = Vue.component('nav-content',{
//     data:function () {
//         return {
//             count: 0
//         }
//     },
//     template: navStr
// })
//
// new Vue({el: '#nav'})


let app1 = new Vue({
    el: '#home',
    data: {
        message:'这里是首页'
    }
});

let app2 = new Vue({
    el: '#classification',
    data: {
        message:'这里显示分类'
    }
});

let app3 = new Vue({
    el: '#spance',
    data: {
        message:'这里是个人主页，可以查看订单'
    }
})