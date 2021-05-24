'use strict';

$(function() {

    // author badge :)
    // let author = '<div style="position: fixed;bottom: 0;right: 20px;background-color: #fff;box-shadow: 0 4px 8px rgba(0,0,0,.05);border-radius: 3px 3px 0 0;font-size: 12px;padding: 5px 10px;">By <a href="https://twitter.com/mhdnauvalazhar">@mhdnauvalazhar</a> &nbsp;&bull;&nbsp; <a href="https://www.buymeacoffee.com/mhdnauvalazhar">Buy me a Coffee</a></div>';

    // $("body").append(author);

    $("input[type='password'][data-eye]").each(function(i) {
        let $this = $(this),
            id = 'eye-password-' + i,
            el = $('#' + id);

        $this.wrap($("<div/>", {
            style: 'position:relative',
            id: id
        }));

        $this.css({
            paddingRight: 60
        });
        $this.after($("<div/>", {
            html: 'Show',
            class: 'btn btn-primary btn-sm',
            id: 'passeye-toggle-'+i,
        }).css({
            position: 'absolute',
            right: 10,
            top: ($this.outerHeight() / 2) - 12,
            padding: '2px 7px',
            fontSize: 12,
            cursor: 'pointer',
        }));

        $this.after($("<input/>", {
            type: 'hidden',
            id: 'passeye-' + i
        }));

        let invalid_feedback = $this.parent().parent().find('.invalid-feedback');

        if(invalid_feedback.length) {
            $this.after(invalid_feedback.clone());
        }

        $this.on("keyup paste", function() {
            $("#passeye-"+i).val($(this).val());
        });
        $("#passeye-toggle-"+i).on("click", function() {
            if($this.hasClass("show")) {
                $this.attr('type', 'password');
                $this.removeClass("show");
                $(this).removeClass("btn-outline-primary");
            }else{
                $this.attr('type', 'text');
                $this.val($("#passeye-"+i).val());
                $this.addClass("show");
                $(this).addClass("btn-outline-primary");
            }
        });
    });

});

function checkPhone(phone) {

    let pattern = /^[0-9]{8,11}$/;
    if(phone == null)
        return false;
    return pattern.test(phone)
}
function checkPassword(passWord) {

    let pattern = /.{6,20}/;
    if(passWord == null)
        return false;
    return pattern.test(passWord);

}
function checkName(name) {
    let patter = /^([\u4e00-\u9fa5a-zA-Z.1-9\s]{2,20})$/;
    if(name == null)
        return false;
    return patter.test(name);
}

function checkAddress(address) {
    return checkName(address);
}



function logInClick() {

    let userLogger = {
        phone:    document.forms["login"]["phone"].value,
        passWord: document.forms["login"]["password"].value
    };

    if(checkPhone(userLogger.phone) === false) {
        layer.alert("Please Enter Correct Phone");
    }

    if(checkPassword(userLogger.passWord) === false) {

        layer.alert("Please Enter Correct PassWord");
    }

    layer.alert(JSON.stringify(userLogger));

    $.ajax({
        type:"POST",
        url:'http://localhost:8080/userLogin',
        data: JSON.stringify(userLogger),
        contentType: "application/json; charset=utf-8",

        success:function (result) {
            console.log(result);
            document.forms["login"].reset();
        },

        error:function (data) {
            layer.alert(JSON.stringify(data));
        }

    })
}

function registerClick() {
    let passWord  = document.forms["logon"]["password"].value;
    let cPassWord = document.forms["logon"]["cpassword"].value;
    if (passWord !== cPassWord) {
        layer.alert("Please Affirm PassWord");
        return;
    }



    let user = {
        phone:    Number(document.forms["logon"]["phone"].value),
        passWord: document.forms["logon"]["password"].value,
        name:     document.forms["logon"]["name"].value,
        userType: document.forms["logon"]["usertype"].value,
        address:  document.forms["logon"]["address"].value,
    };

    layer.alert(JSON.stringify(user));

    if(checkPhone(user.phone) === false) {
        layer.alert("Please Enter Correct Phone");
        return;
    }

    if(checkPassword(user.passWord) === false) {
        layer.alert("Please Enter Correct PassWord");
        return ;
    }

    if(checkName(user.name) === false) {
        layer.alert("Please Enter Correct Name");
        return;
    }

    if(checkAddress(user.address) === false) {
        layer.alert("Please Enter Correct Address");
        return;
    }



    $.ajax({

        type:"POST",
        url:'http://localhost:8080/userRegister',
        data: JSON.stringify(user),
        contentType: "application/json; charset=utf-8",

        success:function (result) {
            layer.alert(result);
            if(result === "false") {

                layer.alert("注册失败, 已存在该用户");

            } else {
                document.forms["logon"].reset();
                window.location = "http://localhost:8080/login";

            }

        },
        error:function (data) {
            layer.alert(JSON.stringify(data));
        }
    })
}
