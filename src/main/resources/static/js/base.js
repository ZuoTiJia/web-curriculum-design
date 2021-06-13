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
<!--    <li class="layui-nav-item ">-->
<!--        <span title="这是分类">-->
<!--            <p><i class="layui-icon layui-icon-spread-left"></i>分类</p>-->
<!--        </span>-->
<!--        <dl class="layui-nav-child">-->
<!--            <dd><a href="">书</a></dd>-->
<!--            <dd><a href="">日常用品</a></dd>-->
<!--            <dd><a href="">食物</a></dd>-->
<!--            <dd><a href="">服装</a></dd>-->
<!--            <dd><a href="">电子产品</a></dd>-->
<!--        </dl>-->
<!--    </li>-->

    <li class="layui-nav-item">
        <span title="这是购物车">
            <a href=""><i class="layui-icon layui-icon-cart"></i>购物车</a>
        </span>
    </li>

    <li class="layui-nav-item">
        <span title="这是个人中心，可以查看订单">
            <a onclick="space();return 0;"><i class="layui-icon layui-icon-username"></i>个人中心</a>
        </span>
    </li>
    <li class="layui-nav-item">
    <a onclick="space()"><img src="https://t.cn/RCzsdCq" class="layui-nav-img">我</a>
    <dl class="layui-nav-child">
      <dd><a href="javascript:;">修改信息</a></dd>
      <dd><a onclick="">退出登录</a></dd>
    </dl>
  </li>
</ul>
</div>
`;



$("body").prepend(navStr);

function space() {
    phone = $.cookie('phone' );
    let url = "/user/";
    url = url.concat(phone);
    window.location.replace(url)
}

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
