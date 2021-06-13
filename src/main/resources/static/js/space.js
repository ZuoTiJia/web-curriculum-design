// $.ajax({
//
//     type:"POST",
//     url:'http://localhost:8080/userRegister',
//     data: JSON.stringify(user),
//     contentType: "application/json; charset=utf-8",
//
//     success:function (result) {
//         layer.alert(result);
//         if(result === "false") {
//
//             layer.alert("注册失败, 已存在该用户");
//
//         } else {
//             document.forms["logon"].reset();
//             window.location = "http://localhost:8080/login";
//
//         }
//
//     },
//     error:function (data) {
//         layer.alert(JSON.stringify(data));
//     }
// })
// $("#space-name").append()