let img_name = "";


layui.use(['form', 'layedit', 'laydate'], function () {
    var form = layui.form
        , layer = layui.layer
        , layedit = layui.layedit
        , laydate = layui.laydate;


    //自定义验证规则
    form.verify({
        name: [
            /[\u4e00-\u9fa5]{1,12}/,
            '名称必须是中文，并且在12个字之内'
        ]
        , price: [
            /(?!^0*(\.0{1,2})?$)^\d{1,13}(\.\d{1,2})?$/,
            '请输入正确的价格'
        ]
        , remnantInventory: [
            /^[1-9][0-9]{0,5}$/,
            '请输入1-99999之间'
        ]
    });

    //监听指定开关
    form.on('switch(switchTest)', function (data) {
        layer.msg('开关checked：' + (this.checked ? 'true' : 'false'), {
            offset: '6px'
        });
        layer.tips('温馨提示：请注意开关状态的文字可以随意定义，而不仅仅是ON|OFF', data.othis)
    });

    //监听提交
    form.on('submit(demo1)', function (data) {
        // let defaults = {
        //     path: '/'
        // };
        // $.extend(defaults);
        phone = $.cookie('phone' );
        if (phone === undefined) {
            phone = 0
        } else {
            phone = Number(phone);
        }


        let good = {
            name: document.forms['good-form']['name'].value,
            price: parseFloat(document.forms['good-form']['price'].value),
            businessPhone: phone,
            remnantInventory: Number(document.forms['good-form']['remnantInventory'].value),
            goodsType: document.forms['good-form']['goodsType'].value,
            state: document.forms['good-form']['state'].value,
            photoName: img_name,
            describe: document.forms['good-form']['describe'].value,
            cumulativeSales: Number(document.forms['good-form']['cumulativeSales'].value)
        }

        if (phone === 0) {
            layer.alert("请重新登录");
        }


        $.ajax({

            type: "POST",
            url: 'http://localhost:8080/goodsAdd',
            data: JSON.stringify(good),

            contentType: "application/json; charset=utf-8",
            success: function (result) {
                layer.alert(result);
                if (result === "false") {
                    layer.alert("提交失败");
                } else {
                    layer.alert('提交成功');
                }
            },
            error: function (good) {
                layer.alert("提交出错");
                layer.alert(JSON.stringify(good));
            }
        })


        // layer.alert(JSON.stringify(data.field), {
        //   title: '最终的提交信息'
        // })
        return false;
    });

    //表单取值
    layui.$('#LAY-component-form-getval').on('click', function () {
        var data = form.val('example');
        alert(JSON.stringify(data));
    });

});
layui.use(['upload', 'element', 'layer'], function () {
    var $ = layui.jquery
        , upload = layui.upload
        , element = layui.element
        , layer = layui.layer;

    //常规使用 - 普通图片上传
    var uploadInst = upload.render({
        elem: '#test1'
        , url: 'http://localhost:8080/upload' //改成您自己的上传接口
        , before: function (obj) {
            //预读本地文件示例，不支持ie8
            obj.preview(function (index, file, result) {
                img_name = file.name;
                $('#demo1').attr('src', result); //图片链接（base64）
            });

            element.progress('demo', '0%'); //进度条复位
            layer.msg('上传中', {icon: 16, time: 0});
        }
        , done: function (res) {
            //如果上传失败
            if (res.code > 0) {
                return layer.msg('上传失败');
            }
            //上传成功的一些操作
            //……
            $('#demoText').html(''); //置空上传失败的状态
        }
        , error: function () {
            //演示失败状态，并实现重传
            var demoText = $('#demoText');
            demoText.html('<span style="color: #FF5722;">上传失败</span> <a class="layui-btn layui-btn-xs demo-reload">重试</a>');
            demoText.find('.demo-reload').on('click', function () {
                uploadInst.upload();
            });
        }
        //进度条
        , progress: function (n, index, e) {
            element.progress('demo', n + '%'); //可配合 layui 进度条元素使用
            if (n == 100) {
                layer.msg('上传完毕', {icon: 1});
            }
        }
    });
});
  
