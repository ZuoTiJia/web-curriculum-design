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
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Controller
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class})
public class Main {

    /**
     * 个人主页查看订单记录
     * @param model
     * @param userPhone
     * @param request
     * @return
     */
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
        List<OrderForm> orderFormList = DataBase.OrderForm().findOrderForms(userPhone);
        if(orderFormList != null) {
            model.addAttribute(orderFormList);
        }

        return "space";
    }


    /**
     * 主页
     * @param model
     * @return
     */
    @RequestMapping(value="/")
    public String home(Model model) {

        List<Goods> goodsList = DataBase.Goods().findAllGoods();
        model.addAttribute(goodsList);

        return "home";
    }

    /**
     * 获取订单信息
     * @param model
     * @param orderId
     * @return
     */
//    @RequestMapping(value = "/order/{orderId}", method = RequestMethod.GET)
//    public String getOrderForm(Model model, @PathVariable("orderId") int orderId) {
//        OrderForm orderForm = DataBase.OrderForm().findOneOrderForm(orderId);
//        Iterable<Record> records = DataBase.Record().findRecords(orderId);
//
//        for(Record record:records) {
//            record.setGoods(DataBase.Goods().findOneGoods(record.getGoodsId()));
//        }
//
//        model.addAttribute(orderForm);
//        model.addAttribute(records);
////        model.addAttribute(user);
//        return "orderForm";
//    }


    /**
     * 登陆界面
     * @return
     */
    @RequestMapping("/login")
    public String login() {
        return "login";
    }

    /**
     * 注册界面
     * @return
     */
    @RequestMapping("/register")
    public String register() {return "register";}


    /**
     * 登陆接口
     * @param userLogger
     * @param response
     * @return
     */
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
            cookie = new Cookie("phone", String.valueOf(user.getPhone()));
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

    /**
     * 注册接口
     * @param newUser
     * @return
     */
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

    /**
     * 登出接口
     * @param request
     * @return
     */
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


    /**
     * 添加新用户接口
     * @param user
     * @return
     */
    @PostMapping("/userAdd")
    @ResponseBody
    public String userAdd(@RequestBody User user){
        System.out.println(user.getName());
        return user.getName();
    }

    /**
     * 添加货物接口
     * @param goods
     * @return
     */
    @PostMapping("/goodsAdd")
    @ResponseBody
    public String goodsAdd(@RequestBody Goods goods) {
        if(goods == null) {

        }
        DataBase.Goods().insertGoods(goods);
        return "success";
    }

//    @GetMapping("/goodsDelete/{goodsId}")
//    @ResponseBody
//    public String goodsDelete(@PathVariable int goodsId) {
//        DataBase.Goods().deleteGoods(goodsId);
//        return "success";
//    }

//    @PostMapping("/goodsUpdate")
//    @ResponseBody
//    public String goodsUpdate(@RequestBody Goods goods) {
//        DataBase.Goods().updateGoods(goods.getId(), goods);
//        return "success";
//    }

    /**
     * 查询书籍
     * @return
     */
    @GetMapping("/goods/book")
    @ResponseBody
    public Iterable<Goods> getBook() {
        return DataBase.Goods().findAllBooks();
    }

    /**
     * 查询食物
     * @return
     */
    @GetMapping("/goods/food")
    @ResponseBody
    public Iterable<Goods> getFood() {
        return DataBase.Goods().findAllFood();
    }

    /**
     * 查询电子设备
     * @return
     */
    @GetMapping("/goods/electronics")
    @ResponseBody
    public Iterable<Goods> getElectronics() {
        return DataBase.Goods().findAllElectronics();
    }


    /**
     * 检查是否注册过
     * @param phone
     * @return
     */
    @GetMapping("/checkPhone/{phone}")
    @ResponseBody
    public boolean checkPhone(@PathVariable("phone") long phone) {
        return null == DataBase.User().findOneUser(phone);
    }

    /**
     * 上传图片接口
     * @param multipartFile
     * @return
     */
    @PostMapping("/upload")
    @ResponseBody
    public String upload(@RequestParam("file") MultipartFile multipartFile)   {
        File file = new File(Goods.filePath + multipartFile.getOriginalFilename());
        try {
            multipartFile.transferTo(file);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return "true";
    }

    /**
     * 获取图片
     * @param goodsId
     * @return
     */
    @RequestMapping("/image/{goodsId}")
    public @ResponseBody byte[] getPhoto (@PathVariable int goodsId) {

        return DataBase.Goods().findOneGoods(goodsId).getPhoto();
    }

    /**
     * 获取商品信息
     * @param goodsId
     * @return
     */
    @RequestMapping("/goods/{goodsId}")
    @ResponseBody
    public Goods getGoods(@PathVariable int goodsId) {
        Goods goods = DataBase.Goods().findOneGoods(goodsId);
        return goods;
    }


    /**
     * 添加商品页面
     * @return
     */
    @RequestMapping("/manageGoods")
    public String manageGoods() {
        return "add-goods";
    }


    /**
     * 记录订单接口
     * @param order
     * @return
     */
    @PostMapping("/orderAdd")
    @ResponseBody
    public String orderAdd(@RequestBody OrderForm.Order order) {
        OrderForm orderForm = new OrderForm(order.getCustomPhone(), order.getTotalPrice());
        int id = DataBase.OrderForm().insertAndGetKey(orderForm);

        OrderForm.Order.GoodsNumber[] goodsNumbers = order.getGoodsNumbers();
        for(OrderForm.Order.GoodsNumber goodsNumber: goodsNumbers) {
            Record record = new Record(
                    id, goodsNumber.getGoodsId(), goodsNumber.getNumber(), RecordType.Cut);
            DataBase.Record().insertRecord(record);
        }
        return "true";
    }

    /**
     * 获取订单信息
     * @param orderId
     * @return
     */
    @GetMapping("/order/{orderId}")
    @ResponseBody
    public OrderForm getOrder(@PathVariable int orderId) {
        OrderForm orderForm = DataBase.OrderForm().findOneOrderForm(orderId);
        return orderForm;
    }

    /**
     * 获取用户的订单记录
     * @param phone
     * @return
     */
    @GetMapping("/orders/{phone}")
    @ResponseBody
    public Iterable<OrderForm> getOrders(@PathVariable long phone) {
        return DataBase.OrderForm().findOrderForms(phone);
    }

    public static void main(String[] args) {
        SpringApplication.run(Main.class, args);
    }


}
