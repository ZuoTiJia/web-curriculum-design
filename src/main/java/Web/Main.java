package Web;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.json.JSONObject;

@Controller
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class})
public class Main {

    @RequestMapping(value = "/user/{phone}", method = RequestMethod.GET)
    public String getUser(Model model, @PathVariable("phone") long userPhone, HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if(Login.getCookiePhone(cookies) != userPhone) {
            return "login";
        }
        if(!Login.checkLogin(request)) {
            return "login";
        }
        User user = DataBase.User().findOneUser(userPhone);
        model.addAttribute(user);
        return "user";
    }


    @RequestMapping(value="/")
    public String home() {
        return "home";
    }

    @RequestMapping(value = "/order/{orderId}", method = RequestMethod.GET)
    public String getOrderForm(Model model, @PathVariable("orderId") int orderId) {
        OrderForm orderForm = DataBase.OrderForm().findOneOrderForm(orderId);
        Iterable<Record> records = DataBase.Record().findRecords(orderId);

        for(Record record:records) {
            record.setGoods(DataBase.Goods().findOneGoods(record.getGoodsId()));
        }

        model.addAttribute(orderForm);
        model.addAttribute(records);
//        model.addAttribute(user);
        return "orderForm";
    }



    @RequestMapping("/login")
    public String login() {
        return "login";
    }
    @RequestMapping("/register")
    public String register() {return "register";}


    @PostMapping(value = "/userLogin")
    @ResponseBody
    public String userLogin(@RequestBody User.UserLogger userLogger,
                            HttpServletResponse response) {
        User user = DataBase.User().findOneUser(userLogger.getPhone());

        if(user.checkPassWord(userLogger.getPassWord())) {
            System.out.println("success");
            Cookie cookie = new Cookie("token", Login.generateToken(user.getPhone()));
            cookie.setPath("/");
            cookie.setMaxAge(60*60);
            response.addCookie(cookie);
            cookie = new Cookie("phone", String.valueOf(18843336720L));
            cookie.setMaxAge(60*60);
            cookie.setPath("/");
            response.addCookie(cookie);
            return "true";
        }
        else {

            System.out.println("fail");
            return "false";

        }
    }

    @PostMapping(value = "/userRegister")
    @ResponseBody
    public String userLogon(@RequestBody User newUser) {
        User user;

        try {
            user = DataBase.User().findOneUser(newUser.getPhone());

        } catch ( Exception e) {
            DataBase.User().insertUser(newUser);
            System.out.println("add success");
            return "true";
        }

        System.out.println("add fail");
        return "false";
    }
    @GetMapping(value = "/userLogout")
    @ResponseBody
    public String userLogout(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if(cookies != null) {
            for(Cookie cookie: cookies) {
                if(cookie.getName().equals("phone")) {
                    cookie.setMaxAge(0);
                }
                if(cookie.getName().equals("token")) {
                    cookie.setMaxAge(0);
                }
            }
        }
        return "true";
    }


    @PostMapping("/userAdd")
    @ResponseBody
    public String userAdd(@RequestBody User user){
        System.out.println(user.getName());
        return user.getName();
    }

    @PostMapping("/goodsAdd")
    @ResponseBody
    public String goodsAdd(@RequestBody Goods goods) {
        DataBase.Goods().insertGoods(goods);
        return "success";
    }

    @GetMapping("/goodsDelete/{goodsId}")
    @ResponseBody
    public String goodsDelete(@PathVariable int goodsId) {
        DataBase.Goods().deleteGoods(goodsId);
        return "success";
    }

    @PostMapping("/goodsUpdate")
    @ResponseBody
    public String goodsUpdate(@RequestBody Goods goods) {
        DataBase.Goods().updateGoods(goods.getId(), goods);
        return "success";
    }

    @GetMapping("/checkPhone/{phone}")
    @ResponseBody
    public boolean checkPhone(@PathVariable("phone") long phone) {
        return null == DataBase.User().findOneUser(phone);
    }






    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }


}
