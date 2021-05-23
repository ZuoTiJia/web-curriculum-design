"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var axios_1 = require("axios");
var djy = {
    phone: 123456,
    passWord: "1933",
    name: "djy",
    userType: "Admin",
    address: null
};
var ccx = {
    phone: 18843336720,
    passWord: "asd123"
};
axios_1.default.post('http://localhost:8080/userLogin', ccx).then(function (response) {
    console.log(response.data);
});
axios_1.default.get('http://localhost:8080/user/18843336720').then(function (response) {
    console.log(response.data);
});
//     .catch(reason => {
//     console.log("hello");
// });
// axios.get('http://localhost:8080/18843336720').then(function (response) {
//     console.log(response.data);
// }).catch(reason => {
//     console.log(reason);
// });
