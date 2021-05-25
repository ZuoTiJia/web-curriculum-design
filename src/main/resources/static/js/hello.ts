import axios from "axios";
// @ts-ignore
import cookieParser from "cookie-parser";
// @ts-ignore
import express from "express";

type User = {
    phone:      Number;
    passWord:   String;
    name:       String;
    userType:   String;
    address:String;
};
type UserLogger = {
    phone:    Number;
    passWord: String;
};



const ccx:UserLogger = {
    phone:18843336720,
    passWord:"asd123"
};

let app = express();
app.use(cookieParser());
app.post("/")


axios.post('http://localhost:8080/userLogin', ccx).then(function (response){
    console.log(response.data);
})
axios.get('http://localhost:8080/user/18843336720').then(function (response) {
    console.log(response.data);

})
let allCookies = document.cookie;
console.log(allCookies);



