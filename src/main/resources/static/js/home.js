layui.use('flow', function () {
    let flow = layui.flow;
    flow.load({
        elem: '#flow',
        scrollElem: '#flow',
        done:function (page, next) {
            setTimeout(function () {
                let list = [];
                for(let i = 0; i <8; i++) {
                    list.push('<li>' + ((page - 1) * 8 + i + 1) + '</li>')
                }

                next(list.join(''), page < 10);
            }, 500);
        }

    })
})