const navStr =
`<ul class="layui-nav" lay-filter="" v-if="true" >
    <li class="layui-nav-item">
        <div class="layui-anim layui-anim-scaleSpring" >
            <span v-bind:title="home_message">
                <a href=""><i class="layui-icon layui-icon-home"></i>首页</a>
            </span>
        </div>
    </li>
    <li class="layui-nav-item ">
        <span v-bind:title="classification_message">
            <p><i class="layui-icon layui-icon-spread-left"></i>分类</p>
        </span>
        <dl class="layui-nav-child">
            <dd><a href="">书</a></dd>
            <dd><a href="">日常用品</a></dd>
            <dd><a href="">食物</a></dd>
            <dd><a href="">服装</a></dd>
            <dd><a href="">电子产品</a></dd>
        </dl>
    </li>

    <li class="layui-nav-item">
        <span v-bind:title="cart_message">
            <a href=""><i class="layui-icon layui-icon-cart"></i>购物车</a>
        </span>
    </li>

    <li class="layui-nav-item">
        <span v-bind:title="spance_message">
            <a href=""><i class="layui-icon layui-icon-username"></i>个人中心</a>
        </span>
    </li>
    <li class="layui-nav-item">
    <a href=""><img src="https://t.cn/RCzsdCq" class="layui-nav-img">我</a>
    <dl class="layui-nav-child">
      <dd><a href="javascript:;">修改信息</a></dd>
      <dd><a onclick="">退出登录</a></dd>
    </dl>
  </li>
</ul>
`
function logout() {
    $.ajax({

        type:"GET",
        url:'http://10.151.250.175:8080/userLogout',

        success:function (result) {
            alert(result);
            if(result === "false") {
                alert("注册失败, 已存在该用户");
            } else {
                window.location = "http://10.151.250.175:8080/login";
            }

        },
        error:function (data) {
            alert(JSON.stringify(data));
        }
    })

}


let nav = Vue.component('nav-content',{
    template: navStr,
    data() {
        return {
            home_message:'这里是首页',
            classification_message:'这里显示分类',
            cart_message:'这里是购物车',
            spance_message:'这里是个人主页，可以查看订单'
        }
    }
})


new Vue({
    el: '#nav'
})
